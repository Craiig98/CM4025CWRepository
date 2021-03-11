@ECHO OFF
ECHO Starting app
set PORT=8080 && set JWT_SECRET="mysecret" && set MONGODB_URI="mongodb+srv://MyDBAdmin:I3nmOKU2Ign3a7te@cluster0.zh61e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
npm run-script development