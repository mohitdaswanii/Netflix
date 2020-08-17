const movieSchema = require("../models//movies");
module.exports = {
  get: {
    async getAllMovies(req, res) {
      const allMovies = await movieSchema.find();
      res.json({ statusCode: 200, movies: allMovies });
    },
    async singleMovie(req, res) {
      try {
        const { movieId } = req.params;
        const { watched } = req.body;
        const movie = await movieSchema.findOneAndUpdate(
          { _id: movieId },
          { trending: watched },
          {
            new: true,
          }
        );
        res.json({ statusCode: 201, movie: movie });
      } catch (err) {
        console.log(err);
      }
    },
    async search_movie(req, res) {
      try {
        const { value } = req.body;
        console.log(value);
        const movie = await movieSchema.find({
          MovieName: { $regex: value, $options: "i" },
        });
        console.log(movie);
        res.json({ statusCode: 201, movie: movie });
      } catch (err) {
        console.log(err);
        return res.json("Server Error");
      }
    },
    async getMovieByLanguage(req, res) {
      try {
        const { language } = req.params;
        console.log(language);
        const Allmovies = await movieSchema.find({ language });
        console.log(Allmovies);
        res.json({ statusCode: 201, movies: Allmovies });
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
    async fetchTrendingMovies(req, res) {
      try {
        const movies = await movieSchema.find({}).sort({ trending: -1 });
        console.log(movies);
        res.json({statusCode:201,movies});
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
    async fetchTopRatedMovies(req, res) {
      try {
        const movies = await movieSchema.find({}).sort({ rating: -1 });
        console.log(movies);
        res.send(movies);
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
    async fetchNetflixOriginalMovies(req, res) {
      try {
        const user = req.user;
        if (user.isPaid === true) {
          const movies = await movieSchema
            .find({ isPaid: true })
            .sort({ trending: -1 });
          res.send({statusCode:201,movies});
        } else
          return res.json({
            statusCode: 400,
            message: "please subscribe the premium plan",
          });
      } catch (err) {
        console.log(err);
        res.send("serverError");
      }
    },
    async getMovieByGenre(req,res){
      const {genres}=req.params
      const movies= await movieSchema.find({})
     const filteredMovies=await movies.filter((movie)=>{
     return movie.genre[genres]===true
     })
      res.json({statusCode:201,filteredMovies})
    }
  },
};
