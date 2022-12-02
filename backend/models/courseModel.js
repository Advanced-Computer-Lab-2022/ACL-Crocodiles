const mongoose = require('mongoose')
const Schema = mongoose.Schema

//COURSES SCHEMA
const courseSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Subject: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Discount: {
        type: Number,
        required: false
    },
    DiscountEndDate: {
        type: Date,
        required: false
    },
    Hours: {
        type: Number,
        required: true
    },
    Summary: {
        type: String,
        required: false
    },
    InstructorId: {
        type: mongoose.Schema.Types.ObjectId,   
        ref:'Instructor',
        required: true
    },
    Rating: {
        type: Number,
        required: false
    },
    Subtitle: {
        type: [String],
        //ref: 'subtitleSchema'
        required: false
    },
}, { timestamps: true })



//SUBTITLES SCHEMA
const subtitleSchema = new Schema({
    Title: {
        type: String,
        required: true
    },
    Hours: {
        type: Number,
        required: true
    },
    
    // CourseId: {
    //     type: Number,
    //     required: false
    // },
     Exercise: {
        type: String
    //     type: Schema.Types.ObjectId, 
       //  ref: 'Exercise'
    },
}, { timestamps: true })

// const discountSchema = new Schema({
//     DiscountPercentage: {
//         type: Number,
//         required: true
//     },
//     EndDate: {
//         type: Date,
//         required: true
//     },
//     CourseId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Course',
//         required: true
//     }
// }, { timestamps: true })

courseSchema.statics.deleteDiscounts = async function () {
    const courses = await this.find()
    courses.forEach(async (course) => {
        if (course.DiscountEndDate < Date.now()) {
        course.Discount = undefined
        course.DiscountEndDate = undefined
        await course.save()
        }})
}

const course = mongoose.model('Course', courseSchema)
const sub = mongoose.model('Subtitle', subtitleSchema)
module.exports = {course, sub}



//EXERCISE SCHEMA
