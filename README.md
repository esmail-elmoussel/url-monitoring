## Live preview

App deployed using [Render Platform](https://render.com/) and can be found [here](https://url-monitoring.onrender.com)

## Environment variables

| Key            | Value  | example         | description                             | required |
| -------------- | ------ | --------------- | --------------------------------------- | -------- |
| PORT           | number | 3000            | Port to run server on                   | Yes      |
| DATABASE_URL   | string | sqlite::memory: | Full database url                       | Yes      |
| EMAIL          | string | test@test.com   | Email to send emails from               | Yes      |
| EMAIL_PASSWORD | string | shhhh           | Email app password                      | Yes      |
| OTP_SECRET     | string | shhhh           | Password to secure OTP                  | Yes      |
| JWT_SECRET     | string | shhhh           | JWT password                            | Yes      |
| PUSHOVER_TOKEN | string | shhhh           | [Pushover](https://pushover.net/) token | Yes      |

## Running app locally

All you need to do is running:

```bash
docker-compose up
```

## API Documentation

[Postman](https://www.postman.com/) collection can be found [here](https://api.postman.com/collections/20984540-357604f2-8f99-4864-bf0e-7b31ce8236ec?access_key=PMAT-01GMN7TPZPW6PEQ320RAYDTJ9S)


## Database Schema Design
<img width="1507" alt="Screenshot 2023-03-30 at 6 04 25 PM" src="https://user-images.githubusercontent.com/60473694/228896820-f62efe39-1690-4b91-92f1-8abbce1fdae9.png">
