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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Discount',
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

const discountSchema = new Schema({
    DiscountPercentage: {
        type: Number,
        required: true
    },
    EndDate: {
        type: Date,
        required: true
    },
    CourseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    }
}, { timestamps: true })

discountSchema.statics.deleteDiscounts = async function () {
    const discounts = await this.find()
    discounts.forEach(async discount => {
        if(discount.EndDate >= getTodayDate()){
            //make the value of discount field in course schema null
            await course.updateOne({_id:discount.CourseId},{$set:{Discount:null}})
            await discount.delete()
        }
    })
}

const course = mongoose.model('Course', courseSchema)
const sub = mongoose.model('Subtitle', subtitleSchema)
const discount = mongoose.model('Discount', discountSchema)

module.exports = {course, sub, discount}



//EXERCISE SCHEMA
