--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-11-02 12:45:22 SAST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 213 (class 1259 OID 16443)
-- Name: CarRent; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."CarRent" (
    "rentID" integer NOT NULL,
    "rentDate" date,
    "returnDate" date,
    "carID" integer,
    "userID" integer
);


ALTER TABLE public."CarRent" OWNER TO postgres;

--
-- TOC entry 3581 (class 0 OID 16443)
-- Dependencies: 213
-- Data for Name: CarRent; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."CarRent" ("rentID", "rentDate", "returnDate", "carID", "userID") FROM stdin;
\.


--
-- TOC entry 3439 (class 2606 OID 16447)
-- Name: CarRent CarRent_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarRent"
    ADD CONSTRAINT "CarRent_pkey" PRIMARY KEY ("rentID");


--
-- TOC entry 3440 (class 2606 OID 16450)
-- Name: CarRent CarRent_carID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarRent"
    ADD CONSTRAINT "CarRent_carID_fkey" FOREIGN KEY ("carID") REFERENCES public."Cars"("carID");


--
-- TOC entry 3441 (class 2606 OID 16457)
-- Name: CarRent CarRent_userID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."CarRent"
    ADD CONSTRAINT "CarRent_userID_fkey" FOREIGN KEY ("userID") REFERENCES public.users("userID");


-- Completed on 2022-11-02 12:45:23 SAST

--
-- PostgreSQL database dump complete
--

