--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-11-02 14:16:05 SAST

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
-- TOC entry 211 (class 1259 OID 16426)
-- Name: company; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.company (
    "companyID" integer NOT NULL,
    "companyName" text,
    address text
);


ALTER TABLE public.company OWNER TO postgres;

--
-- TOC entry 3579 (class 0 OID 16426)
-- Dependencies: 211
-- Data for Name: company; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.company ("companyID", "companyName", address) FROM stdin;
\.


--
-- TOC entry 3439 (class 2606 OID 16432)
-- Name: company company_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.company
    ADD CONSTRAINT company_pkey PRIMARY KEY ("companyID");


-- Completed on 2022-11-02 14:16:05 SAST

--
-- PostgreSQL database dump complete
--

