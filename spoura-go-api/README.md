# Go + Vercel Functions + Postgres 

Instructions on how to create an API layer with Go and common usage routes, all hosted on vercel and connecting to a postgres database.

<table>
  <tr>
    <td align="center">
      <a href="https://go.dev/">
        <img src="https://i.pinimg.com/564x/9c/1a/7b/9c1a7b98ba1e02023393846c9509c587.jpg" alt="Go" width="140">
      </a>
    </td>
    <td align="center">
      <a href="https://vercel.com/">
        <img src="https://encore.dev/assets/resources/vercel_cover.jpg" alt="Vercel" width="140">
      </a>
    </td>
    <td align="center">
      <a href="https://www.postgresql.org/">
        <img src="https://cdn.clever-cloud.com/uploads/2023/08/pgsql.svg" alt="Postgres" width="140">
      </a>
    </td>
  </tr>
</table>

## Routes

### /api
<a href="https://go-vercel-postgres.vercel.app/api">https://go-vercel-postgres.vercel.app/api</a>
<br>
Index for application, holding basic application information.

### /api/date
<a href="https://go-vercel-postgres.vercel.app/api/date">https://go-vercel-postgres.vercel.app/api/date</a>
<br>
Get current date string.

### /api/dbget
<a href="https://go-vercel-postgres.vercel.app/api/dbget">https://go-vercel-postgres.vercel.app/api/dbget</a>
<br>
Connect to the postgres instance and retrieve id and name fields in the "USERS" table.

### /api/dbdelete/id
<a href="https://go-vercel-postgres.vercel.app/api/dbdelete/1">https://go-vercel-postgres.vercel.app/api/dbdelete/1</a>
<br>
Connect to the postgres instance and delete record using id variable in the "USERS" table.

### /api/dbinsert/name
<a href="https://go-vercel-postgres.vercel.app/api/dbinsert/testingname">https://go-vercel-postgres.vercel.app/api/dbinsert/testingname</a>
<br>
Connect to the postgres instance and insert record using name variable and incremented id, in the "USERS" table.

### /api/dbupdate/id/name
<a href="https://go-vercel-postgres.vercel.app/api/dbupdate/1/updatedname">https://go-vercel-postgres.vercel.app/api/1/updatedname</a>
<br>
Connect to the postgres instance and update record using name and id variables, in the "USERS" table.

## Getting Started

1. Clone the repo:
   ```sh
    git clone https://github.com/mtlh/go-vercel-postgres.git
   ```

2. Create .env file with the following fields:
   ```
    PGHOST='hosturl'
    PGDATABASE='db'
    PGUSER='user'
    PGPASSWORD='pass'
   ```

3. Link to Vercel:
    ```
    npm -g vercel
    vercel --prod
   ```
