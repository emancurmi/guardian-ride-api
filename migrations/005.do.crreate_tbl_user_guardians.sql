CREATE TABLE public.tbl_user_guardians
(
    userguardiansid serial primary key,
    userid text NOT NULL,
    guardianid integer NOT NULL
);