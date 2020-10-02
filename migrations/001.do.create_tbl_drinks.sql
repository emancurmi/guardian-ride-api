CREATE TABLE public.tbl_drinks
(
    drinkid serial primary key,
    drinkname text NOT NULL,
    drinkalcoholvalue integer NOT NULL
);