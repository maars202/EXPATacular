# EXPATacular
Project: WADII_project

## Group Members:
- Goh Soon Hao
- Jethro Ong Yong En
- Lim Bei Ling Cheryl
- Maaruni Pandithurai
- Yi Mon Mon Aung

# How to set up this application
Online:
https://maars202.github.io/EXPATacular/index.html

Local:
Insert files into web root and launch http://localhost/tourist_app/index.html in browser

# APIs 

1. Community (Forum) API:
- https://expatacular.herokuapp.com/api/users/latest_post
- https://expatacular.herokuapp.com/api/forum/postquestion
- https://expatacular.herokuapp.com/api/forum/getcomments4quest
- https://expatacular.herokuapp.com/api/forum/likecomment

2. Community (Post) API:
- https://expatacular.herokuapp.com/api/users/post_review

3. Currency API:
- http://api.exchangeratesapi.io/v1/latest, *called via https://expatacular.herokuapp.com/api/exchange/*

4. Translator API:
- https://expatacular.herokuapp.com/api/users/translateText
- https://expatacular.herokuapp.com/api/users/detectLanguage

5. Weather API: 
- https://api.data.gov.sg/v1/environment/air-temperature
- https://api.data.gov.sg/v1/environment/rainfall
- https://api.data.gov.sg/v1/environment/relative-humidity
- https://api.data.gov.sg/v1/environment/wind-speed

6. Covid API:
- https://covid-api.com/api/reports/total?iso=SGP

# External tools used
- MongoDB 


## License
[MIT](https://choosealicense.com/licenses/mit/)
