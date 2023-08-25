--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

-- Started on 2023-08-25 18:03:21 -03

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

--
-- TOC entry 2 (class 3079 OID 25008)
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- TOC entry 4565 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- TOC entry 3 (class 3079 OID 25444)
-- Name: btree_gist; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gist WITH SCHEMA public;


--
-- TOC entry 4566 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION btree_gist; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gist IS 'support for indexing common datatypes in GiST';


--
-- TOC entry 4 (class 3079 OID 26067)
-- Name: citext; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;


--
-- TOC entry 4567 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION citext; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION citext IS 'data type for case-insensitive character strings';


--
-- TOC entry 5 (class 3079 OID 26172)
-- Name: cube; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS cube WITH SCHEMA public;


--
-- TOC entry 4568 (class 0 OID 0)
-- Dependencies: 5
-- Name: EXTENSION cube; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION cube IS 'data type for multidimensional cubes';


--
-- TOC entry 6 (class 3079 OID 26261)
-- Name: dblink; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dblink WITH SCHEMA public;


--
-- TOC entry 4569 (class 0 OID 0)
-- Dependencies: 6
-- Name: EXTENSION dblink; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dblink IS 'connect to other PostgreSQL databases from within a database';


--
-- TOC entry 7 (class 3079 OID 26307)
-- Name: dict_int; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_int WITH SCHEMA public;


--
-- TOC entry 4570 (class 0 OID 0)
-- Dependencies: 7
-- Name: EXTENSION dict_int; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_int IS 'text search dictionary template for integers';


--
-- TOC entry 8 (class 3079 OID 26312)
-- Name: dict_xsyn; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS dict_xsyn WITH SCHEMA public;


--
-- TOC entry 4571 (class 0 OID 0)
-- Dependencies: 8
-- Name: EXTENSION dict_xsyn; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION dict_xsyn IS 'text search dictionary template for extended synonym processing';


--
-- TOC entry 9 (class 3079 OID 26317)
-- Name: earthdistance; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS earthdistance WITH SCHEMA public;


--
-- TOC entry 4572 (class 0 OID 0)
-- Dependencies: 9
-- Name: EXTENSION earthdistance; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION earthdistance IS 'calculate great-circle distances on the surface of the Earth';


--
-- TOC entry 10 (class 3079 OID 26333)
-- Name: fuzzystrmatch; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS fuzzystrmatch WITH SCHEMA public;


--
-- TOC entry 4573 (class 0 OID 0)
-- Dependencies: 10
-- Name: EXTENSION fuzzystrmatch; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION fuzzystrmatch IS 'determine similarities and distance between strings';


--
-- TOC entry 11 (class 3079 OID 26344)
-- Name: hstore; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS hstore WITH SCHEMA public;


--
-- TOC entry 4574 (class 0 OID 0)
-- Dependencies: 11
-- Name: EXTENSION hstore; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION hstore IS 'data type for storing sets of (key, value) pairs';


--
-- TOC entry 12 (class 3079 OID 26472)
-- Name: intarray; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS intarray WITH SCHEMA public;


--
-- TOC entry 4575 (class 0 OID 0)
-- Dependencies: 12
-- Name: EXTENSION intarray; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION intarray IS 'functions, operators, and index support for 1-D arrays of integers';


--
-- TOC entry 13 (class 3079 OID 26594)
-- Name: ltree; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS ltree WITH SCHEMA public;


--
-- TOC entry 4576 (class 0 OID 0)
-- Dependencies: 13
-- Name: EXTENSION ltree; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION ltree IS 'data type for hierarchical tree-like structures';


--
-- TOC entry 14 (class 3079 OID 26779)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 4577 (class 0 OID 0)
-- Dependencies: 14
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- TOC entry 15 (class 3079 OID 26804)
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- TOC entry 4578 (class 0 OID 0)
-- Dependencies: 15
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- TOC entry 16 (class 3079 OID 26885)
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;


--
-- TOC entry 4579 (class 0 OID 0)
-- Dependencies: 16
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- TOC entry 17 (class 3079 OID 26922)
-- Name: pgrowlocks; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgrowlocks WITH SCHEMA public;


--
-- TOC entry 4580 (class 0 OID 0)
-- Dependencies: 17
-- Name: EXTENSION pgrowlocks; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgrowlocks IS 'show row-level locking information';


--
-- TOC entry 18 (class 3079 OID 26924)
-- Name: pgstattuple; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgstattuple WITH SCHEMA public;


--
-- TOC entry 4581 (class 0 OID 0)
-- Dependencies: 18
-- Name: EXTENSION pgstattuple; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pgstattuple IS 'show tuple-level statistics';


--
-- TOC entry 19 (class 3079 OID 26934)
-- Name: tablefunc; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS tablefunc WITH SCHEMA public;


--
-- TOC entry 4582 (class 0 OID 0)
-- Dependencies: 19
-- Name: EXTENSION tablefunc; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION tablefunc IS 'functions that manipulate whole tables, including crosstab';


--
-- TOC entry 20 (class 3079 OID 26955)
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- TOC entry 4583 (class 0 OID 0)
-- Dependencies: 20
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- TOC entry 21 (class 3079 OID 26962)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 4584 (class 0 OID 0)
-- Dependencies: 21
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 22 (class 3079 OID 26973)
-- Name: xml2; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS xml2 WITH SCHEMA public;


--
-- TOC entry 4585 (class 0 OID 0)
-- Dependencies: 22
-- Name: EXTENSION xml2; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION xml2 IS 'XPath querying and XSLT';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 249 (class 1259 OID 27105)
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "createdBy" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    comment text NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 27104)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.comments_id_seq OWNER TO postgres;

--
-- TOC entry 4586 (class 0 OID 0)
-- Dependencies: 248
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 236 (class 1259 OID 26987)
-- Name: followers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.followers (
    "followerId" integer NOT NULL,
    "followingId" integer NOT NULL
);


ALTER TABLE public.followers OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 26990)
-- Name: hashtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    hashtag text NOT NULL,
    total integer NOT NULL
);


ALTER TABLE public.hashtags OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 26995)
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hashtags_id_seq OWNER TO postgres;

--
-- TOC entry 4587 (class 0 OID 0)
-- Dependencies: 238
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- TOC entry 239 (class 1259 OID 26996)
-- Name: likes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    userliked integer NOT NULL,
    "postId" integer NOT NULL
);


ALTER TABLE public.likes OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 27000)
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.likes_id_seq OWNER TO postgres;

--
-- TOC entry 4588 (class 0 OID 0)
-- Dependencies: 240
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- TOC entry 241 (class 1259 OID 27001)
-- Name: posts; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    "createdBy" integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    url text NOT NULL,
    description text,
    repost boolean DEFAULT false,
    "origemPostId" integer,
    "origemCreatedBy" integer
);


ALTER TABLE public.posts OWNER TO postgres;

--
-- TOC entry 247 (class 1259 OID 27102)
-- Name: origemid_post; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.origemid_post
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.origemid_post OWNER TO postgres;

--
-- TOC entry 4589 (class 0 OID 0)
-- Dependencies: 247
-- Name: origemid_post; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.origemid_post OWNED BY public.posts.id;


--
-- TOC entry 242 (class 1259 OID 27007)
-- Name: postsHashtags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."postsHashtags" (
    id integer NOT NULL,
    "postId" integer NOT NULL,
    "hashtagId" integer NOT NULL
);


ALTER TABLE public."postsHashtags" OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 27010)
-- Name: postsHashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."postsHashtags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."postsHashtags_id_seq" OWNER TO postgres;

--
-- TOC entry 4590 (class 0 OID 0)
-- Dependencies: 243
-- Name: postsHashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."postsHashtags_id_seq" OWNED BY public."postsHashtags".id;


--
-- TOC entry 244 (class 1259 OID 27011)
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.posts_id_seq OWNER TO postgres;

--
-- TOC entry 4591 (class 0 OID 0)
-- Dependencies: 244
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- TOC entry 245 (class 1259 OID 27012)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    photo text NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 27017)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4592 (class 0 OID 0)
-- Dependencies: 246
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4374 (class 2604 OID 27108)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 4366 (class 2604 OID 27082)
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- TOC entry 4368 (class 2604 OID 27083)
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- TOC entry 4370 (class 2604 OID 27084)
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- TOC entry 4372 (class 2604 OID 27085)
-- Name: postsHashtags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsHashtags" ALTER COLUMN id SET DEFAULT nextval('public."postsHashtags_id_seq"'::regclass);


--
-- TOC entry 4373 (class 2604 OID 27086)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4559 (class 0 OID 27105)
-- Dependencies: 249
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, "postId", "createdBy", "createdAt", comment) FROM stdin;
\.


--
-- TOC entry 4546 (class 0 OID 26987)
-- Dependencies: 236
-- Data for Name: followers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.followers ("followerId", "followingId") FROM stdin;
3	6
4	7
\.


--
-- TOC entry 4547 (class 0 OID 26990)
-- Dependencies: 237
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hashtags (id, hashtag, total) FROM stdin;
1	lofi	1
2	youtube	1
3	music	1
4	playlist	1
6	relax	1
5	code	5
7	tiktok	1
\.


--
-- TOC entry 4549 (class 0 OID 26996)
-- Dependencies: 239
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.likes (id, "createdAt", userliked, "postId") FROM stdin;
130	2023-08-18 22:15:37.724842	3	8
31	2023-08-18 17:08:52.851745	4	8
162	2023-08-19 01:33:08.575808	3	12
163	2023-08-19 01:33:12.878797	3	10
164	2023-08-19 01:33:15.024875	3	9
166	2023-08-21 15:08:45.44801	3	18
167	2023-08-24 22:34:00.19484	4	50
168	2023-08-24 22:34:03.099643	4	49
169	2023-08-24 22:34:06.391525	4	48
170	2023-08-24 22:34:09.976873	4	46
171	2023-08-24 22:34:24.658793	4	18
172	2023-08-24 22:34:29.561815	4	10
\.


--
-- TOC entry 4551 (class 0 OID 27001)
-- Dependencies: 241
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.posts (id, "createdBy", "createdAt", url, description, repost, "origemPostId", "origemCreatedBy") FROM stdin;
10	1	2023-08-17 02:31:40.614	https://www.figma.com/	figam	f	\N	\N
9	1	2023-08-17 02:30:40.027	http://youtube.com	tube	f	\N	\N
12	1	2023-08-17 02:34:43.324	https://www.figma.com/	fig	f	\N	\N
19	6	2023-08-21 16:59:43.453	https://www.youtube.com/watch?v=QKbC46k7Kyg&ab_channel=manodeyvin	I find it funny	f	\N	\N
20	6	2023-08-21 17:00:02.814	https://www.youtube.com/watch?v=QKbC46k7Kyg&ab_channel=manodeyvin	I find it funny	f	\N	\N
21	6	2023-08-21 17:03:39.846	https://www.youtube.com/watch?v=QKbC46k7Kyg&ab_channel=manodeyvin	I find it funny	f	\N	\N
22	6	2023-08-21 17:09:56.21	https://www.youtube.com/watch?v=QKbC46k7Kyg&ab_channel=manodeyvin	I find it funny	f	\N	\N
18	6	2023-08-20 21:07:55.627	https://www.youtube.com/watch?v=eqTex_UuhgA&ab_channel=LofiinCities	City Lofi Soundtrack	f	\N	\N
24	4	2023-08-21 14:20:17.471	https://www.youtube.com/watch?v=1G1nMEGod7k	teste post delet	f	\N	\N
23	6	2023-08-21 17:10:43.195	https://www.youtube.com/watch?v=QKbC46k7Kyg&ab_channel=manodeyvin	I find it funny	f	\N	\N
29	4	2023-08-23 15:18:05.677	https://www.youtube.com/watch?v=F1bkk5SsHEk	teste final	f	\N	\N
8	1	2023-08-17 02:25:41.508	http://youtube.com	you	f	\N	\N
40	4	2023-08-24 18:53:26.475	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste scroll infinito	f	\N	\N
41	4	2023-08-24 18:53:32.959	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste1	f	\N	\N
42	4	2023-08-24 18:53:39.785	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 3	f	\N	\N
43	4	2023-08-24 18:53:48.625	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 4	f	\N	\N
44	4	2023-08-24 18:53:55.551	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 5	f	\N	\N
45	4	2023-08-24 18:54:05.746	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 6	f	\N	\N
46	4	2023-08-24 18:54:16.298	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste7	f	\N	\N
47	4	2023-08-24 18:54:30.866	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 8	f	\N	\N
48	4	2023-08-24 18:54:36.92	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 9	f	\N	\N
49	4	2023-08-24 18:54:50.071	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 10	f	\N	\N
50	4	2023-08-24 18:54:56.063	https://www.youtube.com/watch?v=3rmWJAQ0Na4	teste 11	f	\N	\N
51	4	2023-08-24 18:55:01.122	https://www.youtube.com/watch?v=3rmWJAQ0Na4	i	f	\N	\N
52	4	2023-08-25 10:41:54.562	https://www.youtube.com/watch?v=GAWwO6ALe4M	test	f	\N	\N
53	4	2023-08-25 10:42:03.543	https://www.youtube.com/watch?v=GAWwO6ALe4M	test	f	\N	\N
54	4	2023-08-25 10:42:19.181	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste 222	f	\N	\N
55	4	2023-08-25 10:42:34.409	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
56	4	2023-08-25 10:43:12.973	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
57	4	2023-08-25 10:44:15.907	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
58	4	2023-08-25 10:44:39.431	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
59	4	2023-08-25 10:45:43.319	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
60	4	2023-08-25 10:52:25.291	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
61	4	2023-08-25 10:53:34.411	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
62	4	2023-08-25 10:54:14.683	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
63	4	2023-08-25 10:54:40.939	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste	f	\N	\N
64	4	2023-08-25 11:04:55.232	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste l	f	\N	\N
65	4	2023-08-25 11:05:25.97	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste l	f	\N	\N
66	4	2023-08-25 11:06:00.39	https://www.youtube.com/watch?v=GAWwO6ALe4M	teste l	f	\N	\N
67	7	2023-08-25 12:28:53.524	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	Blues music	f	\N	\N
68	4	2023-08-25 12:29:38.247	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	blues	f	\N	\N
69	7	2023-08-25 12:31:41.881	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	blues teste 2	f	\N	\N
70	7	2023-08-25 12:34:51.163	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	teste	f	\N	\N
71	7	2023-08-25 12:36:26.32	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	teste 2	f	\N	\N
72	7	2023-08-25 12:42:00.892	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	teste 3	f	\N	\N
73	4	2023-08-25 12:44:51.254	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	TESTE2	f	\N	\N
74	7	2023-08-25 12:57:28.244	https://www.youtube.com/watch?v=39vz1A1BhoU&t=7s	TESTE 32	f	\N	\N
33	7	2023-08-24 10:38:24.993	https://www.figma.com/	figam	t	10	1
34	4	2023-08-24 11:05:27.32	https://www.figma.com/	figam	t	10	1
\.


--
-- TOC entry 4552 (class 0 OID 27007)
-- Dependencies: 242
-- Data for Name: postsHashtags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."postsHashtags" (id, "postId", "hashtagId") FROM stdin;
1	18	1
2	18	2
3	18	3
4	18	4
5	19	5
6	20	5
7	21	5
8	22	5
9	18	6
10	23	5
11	23	7
\.


--
-- TOC entry 4555 (class 0 OID 27012)
-- Dependencies: 245
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, photo) FROM stdin;
1	ana	ana@ju.com	$2b$10$Gb6hbyNy7vSMGkp1ONnSOerQbk7dcgSxzaJ9IbfUscZIdsK4bGsa2	https://www.google.com/url?sa=i&url=https%3A%2F%2Fbr.freepik.com%2Ffotos%2Fflor&psig=AOvVaw2KTwa4PGawHgszueMCFfEa&ust=1692306418385000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPjV4uiK4oADFQAAAAAdAAAAABAE
2	Henrique	henriquesilva254@gmail.com	$2b$10$SJpDcXH/BX/avjAMZJTBFOr/KPXgJFOTkuCBLK3J5qM3jLdWWNf4q	https://www.google.com/url?sa=i&url=https%3A%2F%2Feduindex.org%2F2021%2F07%2F31%2Fanime-the-global-fandom%2F&psig=AOvVaw3jsWs3REJ5c20_KQPEMk34&ust=1692318331374000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMiYp5m34oADFQAAAAAdAAAAABAJ
3	Henrique	henriquesilva@gmail.com	$2b$10$Fa3/Sa3jyUXJDAXyWz4hM.vaE8AcN6pLMpUnKnljYODMqHsYw0M4G	https://www.google.com/url?sa=i&url=https%3A%2F%2Feduindex.org%2F2021%2F07%2F31%2Fanime-the-global-fandom%2F&psig=AOvVaw3jsWs3REJ5c20_KQPEMk34&ust=1692318331374000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMiYp5m34oADFQAAAAAdAAAAABAJ
4	Willy	will@will.com.br	$2b$10$nlFBppCWQKMC3MiDkGJFzOtAsGh/ng6Jm0XSS0pVh1.NSGeCJ4eLu	https://imgs.search.brave.com/LwDQWoehw2Gk_SAaCOBrMTVb7yzrHV5DzfRiTFbYY7U/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9hbml5/dWtpLmNvbS93cC1j/b250ZW50L3VwbG9h/ZHMvMjAyMS8wOC9h/bml5dWtpLXJvcm9u/b2Etem9yby04NS0x/MDI0eDU3My5qcGc
5	heitor	henriquesilva123@gmail.com	$2b$10$AHjyiPgW6jKNMdUpwK7Cduty5E3byi86Au9vpYJSBkC4PkNVeYPHy	https://www.google.com/url?sa=i&url=https%3A%2F%2Feduindex.org%2F2021%2F07%2F31%2Fanime-the-global-fandom%2F&psig=AOvVaw3jsWs3REJ5c20_KQPEMk34&ust=1692318331374000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCMiYp5m34oADFQAAAAAdAAAAABAJ
6	Rafaela	rafaela@linkr.com	$2b$10$0xO.jzKl5Wp5M7j8UYBQle9t7l.3kecG9wkt4KW0CSa6c/jb.5xmO	https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvdjExNTktY29sb3ItNTAteF8xLWwxa2pjMmcwLmpwZw.jpg?s=emJYeKqM7v5t5anaJEGrhRm9LjTAgTJB57rvqtl6LP8
7	Willyan	willy@willy.com.br	$2b$10$08uI.sZYtZeQrXoH63QAxukMay6CuCx96OuwkN87uIy.pPw9SM/RS	https://imgs.search.brave.com/wQcIS7cexrwxNkIkDn6KoJZ71YUhHCYVkeGbE62y2G8/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1LzY2LzcyLzE1/LzM2MF9GXzU2Njcy/MTU1N19zdnl3ZVpO/OG41YWJJQjZqeU9x/Rlhtc0puYnF1NXJs/OS5qcGc
8	Rafaela	rafa@ela.com	$2b$10$EL1dJCn6QU06uR/XkGvS/eId4MDr2oGi520g1ER.XakqclSUkqz6e	https://pm1.aminoapps.com/8547/1850d767738c92d31726f842f86ebfbc6dfe317cr1-407-600v2_00.jpg
9	teste1	teste1@teste1.com.br	$2b$10$.hySFa67U0u2vsh4fNQhieem1xDqiBpcqI1WcYZOwuXMKkpZ8cl72	https://imgs.search.brave.com/mlBKN4jRcxvZJ8TAreVwuAejPijeFHNTeOv8rj01css/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2Q2Lzcz/L2M4L2Q2NzNjODBj/NTM4NjIwN2ZjYmRh/YzQ4NDQwZmJkZGM3/LmpwZw
\.


--
-- TOC entry 4593 (class 0 OID 0)
-- Dependencies: 248
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- TOC entry 4594 (class 0 OID 0)
-- Dependencies: 238
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 7, true);


--
-- TOC entry 4595 (class 0 OID 0)
-- Dependencies: 240
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.likes_id_seq', 172, true);


--
-- TOC entry 4596 (class 0 OID 0)
-- Dependencies: 247
-- Name: origemid_post; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.origemid_post', 1, true);


--
-- TOC entry 4597 (class 0 OID 0)
-- Dependencies: 243
-- Name: postsHashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."postsHashtags_id_seq"', 11, true);


--
-- TOC entry 4598 (class 0 OID 0)
-- Dependencies: 244
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.posts_id_seq', 75, true);


--
-- TOC entry 4599 (class 0 OID 0)
-- Dependencies: 246
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 9, true);


--
-- TOC entry 4393 (class 2606 OID 27113)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 4377 (class 2606 OID 27024)
-- Name: followers followers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_pkey PRIMARY KEY ("followerId", "followingId");


--
-- TOC entry 4379 (class 2606 OID 27026)
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- TOC entry 4381 (class 2606 OID 27028)
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- TOC entry 4387 (class 2606 OID 27030)
-- Name: postsHashtags postsHashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_pkey" PRIMARY KEY (id);


--
-- TOC entry 4385 (class 2606 OID 27032)
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- TOC entry 4389 (class 2606 OID 27034)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4391 (class 2606 OID 27036)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4382 (class 1259 OID 27093)
-- Name: fki_posts_fk1; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_posts_fk1 ON public.posts USING btree ("origemPostId");


--
-- TOC entry 4383 (class 1259 OID 27099)
-- Name: fki_posts_fk2; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX fki_posts_fk2 ON public.posts USING btree ("origemCreatedBy");


--
-- TOC entry 4403 (class 2606 OID 27114)
-- Name: comments comments_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk0 FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- TOC entry 4404 (class 2606 OID 27119)
-- Name: comments comments_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_fk1 FOREIGN KEY ("createdBy") REFERENCES public.users(id);


--
-- TOC entry 4394 (class 2606 OID 27037)
-- Name: followers followers_follower_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_follower_id_fkey FOREIGN KEY ("followerId") REFERENCES public.users(id);


--
-- TOC entry 4395 (class 2606 OID 27042)
-- Name: followers followers_following_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.followers
    ADD CONSTRAINT followers_following_id_fkey FOREIGN KEY ("followingId") REFERENCES public.users(id);


--
-- TOC entry 4396 (class 2606 OID 27047)
-- Name: likes likes_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk0 FOREIGN KEY (userliked) REFERENCES public.users(id);


--
-- TOC entry 4397 (class 2606 OID 27052)
-- Name: likes likes_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_fk1 FOREIGN KEY ("postId") REFERENCES public.posts(id) ON DELETE CASCADE;


--
-- TOC entry 4401 (class 2606 OID 27057)
-- Name: postsHashtags postsHashtags_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_fk0" FOREIGN KEY ("postId") REFERENCES public.posts(id);


--
-- TOC entry 4402 (class 2606 OID 27062)
-- Name: postsHashtags postsHashtags_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."postsHashtags"
    ADD CONSTRAINT "postsHashtags_fk1" FOREIGN KEY ("hashtagId") REFERENCES public.hashtags(id);


--
-- TOC entry 4398 (class 2606 OID 27067)
-- Name: posts posts_fk0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk0 FOREIGN KEY ("createdBy") REFERENCES public.users(id);


--
-- TOC entry 4399 (class 2606 OID 27088)
-- Name: posts posts_fk1; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk1 FOREIGN KEY ("origemPostId") REFERENCES public.posts(id);


--
-- TOC entry 4400 (class 2606 OID 27094)
-- Name: posts posts_fk2; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_fk2 FOREIGN KEY ("origemCreatedBy") REFERENCES public.users(id);


-- Completed on 2023-08-25 18:03:21 -03

--
-- PostgreSQL database dump complete
--

