const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../../app');

chai.use(chaiHttp);

let token, movieId;

describe('/api/movies testi', () => {
    before((done) => {
        chai.request(server)
            .post('/authenticate')
            .send({username: 'admin', password: 'admin'})
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });

    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

    });

    describe('/POST movie', () => {
        it('it should POST a movie', (done) => {
            const movie = {
                title: 'Udemy',
                director_id: '5c2935e7a5f70c4f91e602c6',
                category: 'Komedi',
                country: 'Türkiye',
                year: 1950,
                imdb_score: 8
            };
            chai.request(server)
                .post('/api/movies')
                .send(movie)
                .set('x-access-token', 'ass')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    movieId = res.body._id;
                    done();
                });
        });

    });

    describe('/GET/movie_id movies', () => {
        it('it should GET a the movie by the given id', (done) => {
            chai.request(server)
                .get(`/api/movies/${movieId}`)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    res.body.should.have.property('_id').eql(movieId);
                    done();
                });
        });

    });

    describe('/PUT/movie_id movies', () => {
        it('it should put a movie', (done) => {
            const movie = {
                title: '93create',
                director_id: '5c2935e7a5f70c4f91e602c6',
                category: 'Suç',
                country: 'Fransa',
                year: 1958,
                imdb_score: 9
            };
            chai.request(server)
                .put(`/api/movies/${movieId}`)
                .send(movie)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);
                    done();
                });
        });

    });

    describe('/DELETE/movie_id movies', () => {
        it('it should DELETE a the movie by the given id', (done) => {
            chai.request(server)
                .delete(`/api/movies/${movieId}`)
                .set('x-access-token', token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('director_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('imdb_score');
                    done();
                });
        });

    });

});

