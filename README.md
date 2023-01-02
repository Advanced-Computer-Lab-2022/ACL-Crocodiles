
# ACL-Crocodiles' Online Learning System

This project is an online learning system website for the *Canadian Chamber of Commerce*.
 


## Motivation

We are students at the **German University in Cairo** and this project was done as a part of the "*Advanced Computer Lab*" course. 
The project contributes 85% to the course's total grade.
Not only was the huge effect on our grade our motivation, but we were also very eager to learn the MERN stack development and made sure to provide a more than adequate product.

## Build Status

- If the instructor uploads a wrong format of embed video link it will show up weird things instead of the video
- If the admin grants/denies a request/refund it the buttons will be diabled but the request won't disappear until the page is refreshed
- When the instructor defines a promotion on his course, the new price doesn't appear until the instructor refreshes the page

## Code Style

We have used standardJS code style.

## Screenshots


#### Guest Home Page

![Guest Home Page](/screenshots/guesthome.png)

#### Explore Page

![Explore Page](/screenshots/explore.png)

#### Course Preview Page

![Course Preview Page](/screenshots/previewcourse.png)

#### My Courses Page

![My Courses Page](/screenshots/mycourses.png)

#### Create course page

![Create course page](/screenshots/createcourse.png)

## Tech/Framework used

- We used Visual Studio Code as a code editor.
- We used the MERN stack (Mongoose, Express, ReactJS, NodeJS) to develop this project.
- We used MUI components for the ReactJS frontend.

## Features

- Made pagination for the explore page (explore page is the one which views all courses)
- We put a lot of work into developing a very satisfying and responsive UX
- We did our best in trying to create a unique and delicate UI
- Created unique home pages for each user
- The pages and buttons are very responsive and they give feedback

## Code Examples

The following are some examples of the functions used in the backend in the controllers:
- Viewing all courses 
```
const viewAllCourses = async (req, res) => {
    try {
        const courses = await Course.find()
        if (!courses) {
            return res.status(404)
            .json({ error: "no courses found" })
        }
        res.status(200).json(courses)
    } catch (error) {
        res.status(400).json({ error: "error" })
    }
}
```
- Instructor uploading a preview video embed link
```
const uploadPreview = async (req, res) => {
    const courseid = req.params.courseid
    const { videoLink } = req.body
    console.log('video embed link : ' + videoLink)
    if (!mongoose.Types.ObjectId.isValid(courseid)) {
        return res.status(404)
        .json({ error: 'no such id' })
    }
    try {
        const course = await Course
        .findByIdAndUpdate(courseid,
         { PreviewVideo: videoLink })
        if (!course) {
            return res.status(404)
            .json({ error: 'course not found' })
        }
        res.status(200).json(videoLink)
    } catch (error) {
        res.status(400).json({ error: 'error' })
    }
}
```

The following is an example of a frontend return statement. 
In this particular example it is the component where the instructor defines a promotion for one of his courses.

```
return (
        <Paper
            elevation={4} style={{padding:20 ,
            width:280, 
            margin: '16px auto', 
            maxHeight:'55vh', 
            borderRadius:'16px'}}
            >
                <Stack spacing={2}>
        <Typography variant="h3">
            Define Discount
        </Typography>
            <TextField 
                label="Discount Percentage" 
                type="number" min="0" max="100" 
                onChange={(e) => setDiscount(e.target.value)} 
                value={Discount} />
            <TextField 
                label="Discount Expiry Date" 
                type="date" 
                onChange={(e) => setEndDate(e.target.value)} 
                value={EndDate}/>
            <Button 
            variant="contained" 
            onClick={handleSubmit}>Submit</Button>
            {success && 
                <Alert severity="success">
                    {success}
                </Alert>}
            {Error && 
                <Alert severity="error">
                    {Error}
                </Alert>}
        </Stack>
        </Paper>
    )
```

## Installation

For developers, we suggest that you install these packages before you start working on this project:
- Install [nodejs](https://nodejs.org/en/download/)
- Install [Visual Studio Code](https://code.visualstudio.com/download)
- Install nodemon with npm
```bash
  npm i nodemon
```
- Install express with npm
```bash
  npm i express
```
- Install mongoose with npm
```bash
  npm i mongoose
```
- Install react with npm
```bash
  npm i react
```
- Install git with npm
```bash
  npm i git
```
- Install mui with npm
```bash
  npm install @mui/material @emotion/react @emotion/styled 
```
- Install mui material icons with npm
```bash
  npm install @mui/icons-material
```

## API Reference

#### View all courses

```http
  GET /api/guest/viewAllCourses
```

*No parameters needed*

#### Rate a course

```http
  POST /api/trainee/page/rateCourse
  POST /api/corpTrainee/page/rateCourse
```

| Body      | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `rating` | `int` | The rating on a scale 1-5 |
| `review` | `string` | The review |
| `courseID` | `string` | The id of the course to be rated |
| `Username` | `string` | The Username of the trainee |

#### Upload a preview video as an instructor for my course

```http
  POST /api/instructor/uploadpreview/:courseid
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `courseid`      | `string` | Id of item to fetch of the course |

| Body      | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `videoLink`  | `string` | Embed link of the video |

#### As an admin, mark a problem as resolved 

```http
  POST /api/admin/resolveproblem
```

| Body | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `problemid` | `string` | Id of the problem |



## Tests

## How to use

There are 5 types of users on the website:
- Guest
- Admin
- Trainee
- Corporate Trainee
- Instructor

The first time you open the website you are automatically a guest.

- ### Want to become a trainee?

```
    1. Click on sign up button on the right of the top bar
    2. Enter your details and click sign up!
```

- ### Want to become an Admin, Corporate Trainee or Instructor?

    You have to be created by an Admin.

- ### You are a logged in user and want to sign out?

    Click on your icon on the right of the top bar and click Sign out.

#### Guest

- Check out our most popular courses, which you can find at the bottom of the home page
- Search for a course from the search bar on the top bar
- Explore a variety of our courses by clicking on explore on the top bar

#### Trainee

- Explore a variety of our courses by clicking on explore on the top bar
- Register to a course by following these steps:

``` 
    1. Click on your desired course
    2. Click on **Buy Now** button
    3. Enter your credit card details
```

- View and access courses that you bought by clicking on **My Courses** on the top bar

#### Corporate Trainee

- Explore a variety of our courses by clicking on explore on the top bar
- Register to a course by following these steps:

``` 
    1. Click on your desired course
    2. Click on **Request Access** button
    3. Wait for an admin to respond to your request
```

- View and access courses that you have access to by clicking on **My Courses** on the top bar

#### Admin

- You can *add a user*, *define a promotion*, View and respond to *course requests*, *refund requests* and *reported problems* by clicking on its respective button on the top bar

#### Instructor

- Create a course by clicking on **Create Course** button on the top bar, and then following the steps
- Define a promotion on one of your courses by following these steps:
```
    1. Click on My Courses button on the top bar
    2. Click on your desired course
    3. You'll find a box titled "Define a promotion"
    4. Type in the percentage discount 
    5. Type in the date you would like this promotion to end
    6. Click on Submit button
```



## Contribute

Contributions are always welcome!

You can contribute by adding features to the system. 

## Credits

Thanks to [MUI](https://mui.com/) which our main resource developing the frontend

Thanks to all the contributors 
- [Adham Aldeib](https://github.com/Deiib2)
- [Karim Ouf](https://github.com/karimouf)
- [Nayer Kotry](https://github.com/Nayer-kotry)
- [Youssef Bahei](https://github.com/ybahei)
- [Abdelrahman Ezzat](https://github.com/Bedo0090)

## License

[MIT](https://choosealicense.com/licenses/mit/)

