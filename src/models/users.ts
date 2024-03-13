import bcrypt from 'bcrypt'
import Client from '../database';

export type User = {
    username: string;
    password: string;
}

export class UserStore {
    async create(u: User): Promise<User> {
        try {
          // @ts-ignore
          const conn = await Client.connect()
          const sql = 'INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *'
          const hash = bcrypt.hashSync(
            u.password + process.env.BCRYPT_PASSWORD, 
            parseInt(process.env.SALT_ROUNDS!)
          );
    
          const result = await conn.query(sql, [u.username, hash])
          const user = result.rows[0]
    
          conn.release()
    
          return user;
        } catch(err) {
          throw new Error(`unable create user (${u.username}): ${err}`)
        } 
      }

      async authenticate(username: string, password: string): Promise<User | null> {
        const conn = await Client.connect()
        const sql = 'SELECT username, password_digest FROM users WHERE username=($1)'
    
        const result = await conn.query(sql, [username])
    
        console.log(password + process.env.BCRYPT_PASSWORD)
    
        if(result.rows.length) {
          const user = result.rows[0]
          console.log(user)
          if (bcrypt.compareSync(password + process.env.BCRYPT_PASSWORD, user.password_digest)) {
            return user
          }
        }
    
        return null
      }
}