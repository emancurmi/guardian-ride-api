module.exports = {
    ADDRESS: process.env.ADDRESS || 'https://guardianride.herokuapp.com',
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV || 'production',
    API_TOKEN: process.env.API_TOKEN || '7b967bbe-afc2-11ea-b3de-0242ac130004',
    DB_URL: process.env.DB_URL || 'postgres://tebymszlqvkfmh:b906bfac8291d770e0e2b88a37f403bf10ccd20cb9ba8fb72b6728fddc699255@ec2-23-20-168-40.compute-1.amazonaws.com:5432/d92tfic84kr9fc',
    DATABASE_URL: process.env.DATABASE_URL || 'postgres://tebymszlqvkfmh:b906bfac8291d770e0e2b88a37f403bf10ccd20cb9ba8fb72b6728fddc699255@ec2-23-20-168-40.compute-1.amazonaws.com:5432/d92tfic84kr9fc',
}