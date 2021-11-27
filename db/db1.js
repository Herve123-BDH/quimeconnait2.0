const mongoose = require("mongoose")

mongoose.connect('mongodb+srv://' + process.env.PASS + '@cluster0.xwl0l.mongodb.net/auth',
{
	 useNewUrlParser: true,
	 useUnifiedTopology: true,

	}
    )
    .then(()=>console.log("connected to mongodb for athentification"))
    .catch(err=> console.log("failed to connect to mongodb for athentification", err))