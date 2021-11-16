import * as SQLite from 'expo-sqlite'

export const dbConnect = 
{
    connect: () => SQLite.openDatabase("RentalZDB1",1.0),
}