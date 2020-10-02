CREATE TABLE public.tbl_users
(
    userid serial primary key,
    username text NOT NULL,
    userphone integer NOT NULL,
    userpin integer NOT NULL
);