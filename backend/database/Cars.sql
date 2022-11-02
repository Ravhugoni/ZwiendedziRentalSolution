--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5
-- Dumped by pg_dump version 14.5

-- Started on 2022-11-02 14:06:20 SAST

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
-- TOC entry 212 (class 1259 OID 16433)
-- Name: Cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Cars" (
    "carID" integer NOT NULL,
    "carName" text,
    "carImage" text,
    model text,
    "numberPlate" text,
    make text,
    price double precision,
    "companyID" integer
);


ALTER TABLE public."Cars" OWNER TO postgres;

--
-- TOC entry 3580 (class 0 OID 16433)
-- Dependencies: 212
-- Data for Name: Cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Cars" ("carID", "carName", "carImage", model, "numberPlate", make, price, "companyID") FROM stdin;
\.


--
-- TOC entry 3439 (class 2606 OID 16449)
-- Name: Cars Cars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT "Cars_pkey" PRIMARY KEY ("carID");


--
-- TOC entry 3440 (class 2606 OID 16438)
-- Name: Cars Cars_companyID_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Cars"
    ADD CONSTRAINT "Cars_companyID_fkey" FOREIGN KEY ("companyID") REFERENCES public.company("companyID");


-- Completed on 2022-11-02 14:06:20 SAST

--
-- PostgreSQL database dump complete
--

