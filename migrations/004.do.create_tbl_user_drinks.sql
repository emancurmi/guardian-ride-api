CREATE TABLE public.tbl_user_drinks
(
    userdrinkid serial primary key,
    userid text NOT NULL,
    drinkid integer NOT NULL,
    userdrinktime date NOT NULL
);