import { connect } from 'mongoose'

export async function startConnection(){
    const db = await connect('mongodb://localhost/photo-gallery-db',{
        useNewUrlParser:true, 
        useFindAndModify: false,
    });
    console.log('Database is connected');
}
