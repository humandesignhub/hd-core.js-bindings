/**
 * ## Sweph
 * Definitive Swiss Ephemeris bindings for Node.js  
 * 
 * [Official documentation for the Swiss Ephemeris](https://www.astro.com/swisseph/swephprg.htm)  
 * [Sweph on Github](https://github.com/timotejroiko/sweph)  
 * [Sweph on NPM](http://npm.com/package/sweph)  
 * 
 * ### Usage
 * ```
 * const { utc_to_jd, calc, houses_ex2, constants, set_ephe_path } = require("sweph");
 * // or - import { utc_to_jd, calc, houses, constants, set_ephe_path } from "sweph";
 *
 * set_ephe_path("./ephemeris"); // folder containing your ephemeris files;
 *
 * const date = utc_to_jd(2020, 1, 25, 15, 35, 0, constants.SE_GREG_CAL);
 * if(date.flag === constants.ERR) { throw new Error(date.error); }
 *
 * const [ jd_et, jd_ut ] = date.data;
 * const flags = constants.SEFLG_SWIEPH | constants.SEFLG_SPEED;
 * const planets = calc(jd_et, constants.SE_SUN, flags);
 * if(planets.flag !== flags) { console.log(planets.error); }
 *
 * const houses = houses_ex2(jd_ut, 0, 37, 54, "P");
 * if(houses.flag === constants.ERR) { console.log(houses.error) }
 *
 * console.log(planets.data, houses.data)
 * ```
 */
declare module "sweph" {

	interface Flag {
		/**
		 * ### Description
		 * Status flag returned by the function  
		 * Use it to check if the function succeeded, failed or if any parameter was modified  
		 * &nbsp;
		 */
		flag: number;
	}
	
	interface Error {
		/**
		 * ### Description
		 * Error message  
		 * An error message will be available here when the flag indicates failure  
		 * &nbsp;
		 */
		error: string;
	}

	interface GetCurrentFileData {
		/**
		 * ### Description
		 * Path to ephemeris file  
		 * &nbsp;
		 */
		path: string;
		/**
		 * ### Description
		 * Ephemeris start date for this file  
		 * &nbsp;
		 */
		start: number;
		/**
		 * ### Description
		 * Ephemeris end date for this file  
		 * &nbsp;
		 */
		end: number;
		/**
		 * ### Description
		 * JPL ephemeris version used to generate the file  
		 * &nbsp;
		 */
		denum: number;
	};

	interface GetOrbitalElements extends Flag, Error {
		/**
		 * ### Description
		 * Array of orbital/kepler elements  
		 * &nbsp;
		 */
		data: [
			/**
			 * Semimajor axis
			 */
			a: number,
			/**
			 * Eccentricity
			 */
			e: number,
			/**
			 * Inclination
			 */
			i: number,
			/**
			 * Longitude of ascending node
			 */
			Ω: number,
			/**
			 * Argument of periapsis
			 */
			ω: number,
			/**
			 * Longitude of periapsis
			 */
			ϖ: number,
			/**
			 * Mean anomaly at epoch
			 */
			M0: number,
			/**
			 * True anomaly at epoch
			 */
			v0: number,
			/**
			 * Eccentric anomaly at epoch
			 */
			E0: number,
			/**
			 * Mean longitude at epoch
			 */
			L0: number,
			/**
			 * Sidereal orbital period in tropical years
			 */
			sidereal_period: number,
			/**
			 * Mean daily motion
			 */
			daily_motion: number,
			/**
			 * Tropical period in years
			 */
			tropical_period: number,
			/**
			 * Synodic period in days  
			 * Negative, if inner planet (Venus, Mercury, Aten asteroids) or Moon
			 */
			synodic_period: number,
			/**
			 * Time of perihelion passage
			 */
			perihelion_passage: number,
			/**
			 * Perihelion distance
			 */
			perihelion_distance: number,
			/**
			 * Aphelion distance
			 */
			aphelion_distance: number
		]
	}
	
	/**
	 * ### Description
	 * Reset swisseph internals and cleanup file handles  
	 * Not usually required as Node cleans after itself
	 * ### Example
	 * ```
	 * close();
	 * ```
	 * &nbsp;
	 */
	export function close(): void;

	/**
	 * ### Description
	 * Set custom delta T
	 * ### Params
	 * ```
	 * • t_acc: number // delta T value
	 * ```
	 * ### Example
	 * ```
	 * // custom delta T
	 * set_delta_t_userdef(66.5);
	 * // reset delta T back to auto
	 * set_delta_t_userdef(constants.SE_DELTAT_AUTOMATIC);
	 * ```
	 * &nbsp;
	 */
	export function set_delta_t_userdef(t_acc: number): void;

	/**
	 * ### Description
	 * Set ephemeris files location
	 * ### Params
	 * ```
	 * • path: string // ephemeris path
	 * ```
	 * ### Example
	 * ```
	 * set_ephe_path("./ephemeris");
	 * ```
	 * &nbsp;
	 */
	export function set_ephe_path(path: string): void;

	/**
	 * ### Description
	 * Set JPL file  
	 * File must be placed in the ephemeris path
	 * ### Params
	 * ```
	 * • file: string // JPL file name
	 * ```
	 * ### Example
	 * ```
	 * // use custom name
	 * set_jpl_file("de405.eph");
	 * // use predefined name
	 * set_jpl_file(constants.SE_FNAME_DE405);
	 * ```
	 * &nbsp;
	 */
	export function set_jpl_file(file: string): void;

	/**
	 * ### Description
	 * Set ayanamsa for sidereal mode  
	 * For predefined ayanamsas, set second and third parameters to 0  
	 * ### Params
	 * ```
	 * • sid_mode: number // Ayanamsa ID
	 * • t0: number // Reference date in jd_ut for custom ayanamsas
	 * • ayan_t0: number // Initial value in degrees for custom ayanamsas
	 * ```
	 * ### Example
	 * ```
	 * // set ayanamsa to Lahiri
	 * set_sid_mode(constants.SE_SIDM_LAHIRI, 0, 0)
	 * // define custom ayanamsa as 25 degrees at J2000
	 * set_sid_mode(constants.SE_SIDM_USER, 2451545, 25)
	 * ```
	 * &nbsp;
	 */
	export function set_sid_mode(sid_mode: number, t0: number, ayan_t0: number): void;

	/**
	 * ### Description
	 * Set custom tidal acceleration
	 * ### Params
	 * ```
	 * • t_acc: number // tidal acceleration value
	 * ```
	 * ### Example
	 * ```
	 * // set custom value
	 * set_tid_acc(25.90);
	 * // set predefined value
	 * set_tid_acc(constants.SE_TIDAL_DE403);
	 * // reset to auto
	 * set_tid_acc(constants.SE_TIDAL_AUTOMATIC);
	 * ```
	 * &nbsp;
	 */
	export function set_tid_acc(t_acc: number): void;

	/**
	 * ### Description
	 * Set geographic coordinates for topocentric mode
	 * ### Params
	 * ```
	 * • geolon: number // geographic longitude in decimal degrees
	 * • geolat: number // geographic latitude in decimal degrees
	 * • elevation: number // elevation in meters
	 * ```
	 * ### Example
	 * ```
	 * // set observer to 124'30E, 23'30N, 1250 meters above sea level;
	 * set_topo(124.5, 23.5, 1250);
	 * // call function with topocentric flag
	 * let result = calc(2342341, constants.SE_MOON, constants.SEFLG_SWIEPH | constants.SEFLG_TOPOCTR)
	 * ```
	 * &nbsp;
	 */
	export function set_topo(geolon: number, geolat: number, elevation: number): void;

	/**
	 * ### Description
	 * Get swisseh version
	 * ### Returns
	 * ```
	 * string // swisseph version
	 * ```
	 * ### Example
	 * ```
	 * const version = version(); // "2.10"
	 * ```
	 * &nbsp;
	 */
	export function version(): string;

	/**
	 * ### Description
	 * Get library path  
	 * Returns the location of the node executable
	 * ### Returns
	 * ```
	 * string // library path
	 * ```
	 * ### Example
	 * ```
	 * const path = get_library_path();
	 * ```
	 * &nbsp;
	 */
	export function get_library_path(): string;

	/**
	 * ### Description
	 * Get internal tidal acceleration value
	 * ### Returns
	 * ```
	 * number // tidal acceleration
	 * ```
	 * ### Example
	 * ```
	 * const tidacc = get_tid_acc();
	 * ```
	 * &nbsp;
	 */
	export function get_tid_acc(): number;

	/**
	 * ### Description
	 * Get an object's name
	 * ### Params
	 * ```
	 * • ipl: number // object ID
	 * ```
	 * ### Returns
	 * ```
	 * string // object's name
	 * ```
	 * ### Example
	 * ```
	 * const name = get_planet_name(constants.SE_PLUTO); // "Pluto"
	 * ```
	 * &nbsp;
	 */
	export function get_planet_name(ipl: number): string;

	/**
	 * ### Description
	 * Get information from the last used ephemeris file
	 * ### Params
	 * ```
	 * • ifno: number // file type
	 * ```
	 * ### Returns
	 * ```
	 * {
	 *   path: string, // path to ephemeris file
	 *   start: number, // ephemeris start date
	 *   end: number, // ephemeris end date
	 *   denum: number // JPL version used to generate the file
	 * }
	 * ```
	 * ### Example
	 * ```
	 * // call calc to load the ephemeris file
	 * calc(2342342, constants.SE_VENUS, constants.SEFLG_SWIEPH);
	 * const fileinfo = get_current_file_data(0);
	 * ```
	 * &nbsp;
	 */
	export function get_current_file_data(ifno: number): GetCurrentFileData;

	/**
	 * ### Description
	 * Get an object's orbital elements for a given date in ephemeris/terrestrial time
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • ipl: number // Object ID
	 * • iflag: number // Calculation flags
	 * ```
	 * ### Returns
	 * ```
	 * {
	 *   flag: number, // OK or ERR
	 *   error: string, // error message if ERR
	 *   data: number [
	 *     a, // semimajor axis
	 *     e, // eccentricity
	 *     i, // inclination
	 *     Ω, // longitude of ascending node
	 *     ω, // argument of periapsis
	 *     ϖ, // longitude of periapsis
	 *     M0, // mean anomaly at epoch
	 *     ν0, // true anomaly at epoch
	 *     E0, // eccentric anomaly at epoch
	 *     L0, // mean longitude at epoch
	 *     sidereal_period, // sidereal orbital period in tropical years
	 *     daily_motion, // mean daily motion
	 *     tropical_period, // tropical period in years
	 *     synodic_period, // synodic period in days
	 *     perihelion_passage, // time of perihelion passage
	 *     perihelion_distance, // perihelion distance
	 *     aphelion_distance // aphelion distance
	 *   ]
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = get_orbital_elements(2314234, constants.SE_MARS, constants.SEFLG_SWIEPH);
	 * if(result.flag === constants.ERR) console.log(result.error);
	 * ```
	 * &nbsp;
	 */
	export function get_orbital_elements(tjd_et: number, ipl: number, iflag: number): GetOrbitalElements

	/**
	 * ### Description
	 * Get Ayanamsa value from universal time with nutation
	 * ### Params
	 * ```
	 * • tjd_ut: number // Julian day in universal time
	 * • ephe_flag: number // Ephemeris flag
	 * ```
	 * ### Returns
	 * ```
	 * {
	 *   flag: number, // Computed ephemeris flag or ERR
	 *   error: string, // Error message if ERR
	 *   data: number // Ayanamsa value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = get_ayanamsa_ex_ut(2314234, constants.SEFLG_SWIEPH);
	 * if(result.flag === constants.ERR) console.log(result.error);
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_ex_ut(tjd_ut: number, ephe_flag: number): {
		flag: number;
		error: string;
		data: number;
	}

	/**
	 * ### Description
	 * Get Ayanamsa value from ephemeris/terrestrial time with nutation
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * • ephe_flag: number // Ephemeris flag
	 * ```
	 * ### Returns
	 * ```
	 * {
	 *   flag: number, // Computed ephemeris flag or ERR
	 *   error: string, // Error message if ERR
	 *   data: number // Ayanamsa value
	 * }
	 * ```
	 * ### Example
	 * ```
	 * const result = get_ayanamsa_ex(2314234, constants.SEFLG_SWIEPH);
	 * if(result.flag === constants.ERR) console.log(result.error);
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_ex(tjd_et: number, ephe_flag: number): {
		flag: number;
		error: string;
		data: number;
	}

	/**
	 * ### Description
	 * Get ayanamsa value from universal time without nutation
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in universal time
	 * ```
	 * ### Returns
	 * ```
	 * number // Ayanamsa value for given date
	 * ```
	 * ### Example
	 * ```
	 * const ayan = get_ayanamsa_ut(2314234); // 19.493219647880473
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_ut(tjd_ut: number): number;

	/**
	 * ### Description
	 * Get ayanamsa value from ephemeris time without nutation
	 * ### Params
	 * ```
	 * • tjd_et: number // Julian day in ephemeris/terrestrial time
	 * ```
	 * ### Returns
	 * ```
	 * number // Ayanamsa value for given date
	 * ```
	 * ### Example
	 * ```
	 * const ayan = get_ayanamsa(2314234); // 19.493219620078364
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa(tjd_et: number): number;

	/**
	 * ### Description
	 * Get name of predefined ayanamsa ID
	 * ### Params
	 * ```
	 * • aya: number // Predefined ayanamsa ID
	 * ```
	 * ### Returns
	 * ```
	 * string // Ayanamsa name
	 * ```
	 * ### Example
	 * ```
	 * const sidname = get_ayanamsa_name(constants.SE_SIDM_LAHIRI); // "Lahiri"
	 * ```
	 * &nbsp;
	 */
	export function get_ayanamsa_name(aya: number): string;

	/**
	 * ### Description
	 * Swisseph Constants
	 * Contains aliases for all predefined constant values
	 */
	export const enum constants {
		OK = 0,
		ERR = -1,
		SE_AUNIT_TO_KM = 149597870.7,
		SE_AUNIT_TO_LIGHTYEAR = 0.000015812507409819728,
		SE_AUNIT_TO_PARSEC = 0.000004848136811095274,   
		SE_JUL_CAL = 0,
		SE_GREG_CAL = 1,
		SE_ECL_NUT = -1,
		SE_SUN = 0,
		SE_MOON = 1,
		SE_MERCURY = 2,
		SE_VENUS = 3,
		SE_MARS = 4,
		SE_JUPITER = 5,
		SE_SATURN = 6,
		SE_URANUS = 7,
		SE_NEPTUNE = 8,
		SE_PLUTO = 9,
		SE_MEAN_NODE = 10,
		SE_TRUE_NODE = 11,
		SE_MEAN_APOG = 12,
		SE_OSCU_APOG = 13,
		SE_EARTH = 14,
		SE_CHIRON = 15,
		SE_PHOLUS = 16,
		SE_CERES = 17,
		SE_PALLAS = 18,
		SE_JUNO = 19,
		SE_VESTA = 20,
		SE_INTP_APOG = 21,
		SE_INTP_PERG = 22,
		SE_NPLANETS = 23,
		SE_PLMOON_OFFSET = 9000,
		SE_AST_OFFSET = 10000,
		SE_VARUNA = 30000,
		SE_FICT_OFFSET = 40,
		SE_FICT_OFFSET_1 = 39,
		SE_FICT_MAX = 999,
		SE_NFICT_ELEM = 15,
		SE_COMET_OFFSET = 1000,
		SE_NALL_NAT_POINTS = 38,
		SE_CUPIDO = 40,
		SE_HADES = 41,
		SE_ZEUS = 42,
		SE_KRONOS = 43,
		SE_APOLLON = 44,
		SE_ADMETOS = 45,
		SE_VULKANUS = 46,
		SE_POSEIDON = 47,
		SE_ISIS = 48,
		SE_NIBIRU = 49,
		SE_HARRINGTON = 50,
		SE_NEPTUNE_LEVERRIER = 51,
		SE_NEPTUNE_ADAMS = 52,
		SE_PLUTO_LOWELL = 53,
		SE_PLUTO_PICKERING = 54,
		SE_VULCAN = 55,
		SE_WHITE_MOON = 56,
		SE_PROSERPINA = 57,
		SE_WALDEMATH = 58,
		SE_FIXSTAR = -10,
		SE_ASC = 0,
		SE_MC = 1,
		SE_ARMC = 2,
		SE_VERTEX = 3,
		SE_EQUASC = 4,
		SE_COASC1 = 5,
		SE_COASC2 = 6,
		SE_POLASC = 7,
		SE_NASCMC = 8,
		SEFLG_JPLEPH = 1,
		SEFLG_SWIEPH = 2,
		SEFLG_MOSEPH = 4,
		SEFLG_HELCTR = 8,
		SEFLG_TRUEPOS = 16,
		SEFLG_J2000 = 32,
		SEFLG_NONUT = 64,
		SEFLG_SPEED3 = 128,
		SEFLG_SPEED = 256,
		SEFLG_NOGDEFL = 512,
		SEFLG_NOABERR = 1024,
		SEFLG_ASTROMETRIC = 1536,
		SEFLG_EQUATORIAL = 2048,
		SEFLG_XYZ = 4096,
		SEFLG_RADIANS = 8192,
		SEFLG_BARYCTR = 16384,
		SEFLG_TOPOCTR = 32768,
		SEFLG_ORBEL_AA = 32768,
		SEFLG_TROPICAL = 0,
		SEFLG_SIDEREAL = 65536,
		SEFLG_ICRS = 131072,
		SEFLG_DPSIDEPS_1980 = 262144,
		SEFLG_JPLHOR = 262144,
		SEFLG_JPLHOR_APPROX = 524288,
		SEFLG_CENTER_BODY = 1048576,
		SEFLG_TEST_PLMOON = 2228280,
		SE_SIDBITS = 256,
		SE_SIDBIT_ECL_T0 = 256,
		SE_SIDBIT_SSY_PLANE = 512,
		SE_SIDBIT_USER_UT = 1024,
		SE_SIDBIT_ECL_DATE = 2048,
		SE_SIDBIT_NO_PREC_OFFSET = 4096,
		SE_SIDBIT_PREC_ORIG = 8192,
		SE_SIDM_FAGAN_BRADLEY = 0,
		SE_SIDM_LAHIRI = 1,
		SE_SIDM_DELUCE = 2,
		SE_SIDM_RAMAN = 3,
		SE_SIDM_USHASHASHI = 4,
		SE_SIDM_KRISHNAMURTI = 5,
		SE_SIDM_DJWHAL_KHUL = 6,
		SE_SIDM_YUKTESHWAR = 7,
		SE_SIDM_JN_BHASIN = 8,
		SE_SIDM_BABYL_KUGLER1 = 9,
		SE_SIDM_BABYL_KUGLER2 = 10,
		SE_SIDM_BABYL_KUGLER3 = 11,
		SE_SIDM_BABYL_HUBER = 12,
		SE_SIDM_BABYL_ETPSC = 13,
		SE_SIDM_ALDEBARAN_15TAU = 14,
		SE_SIDM_HIPPARCHOS = 15,
		SE_SIDM_SASSANIAN = 16,
		SE_SIDM_GALCENT_0SAG = 17,
		SE_SIDM_J2000 = 18,
		SE_SIDM_J1900 = 19,
		SE_SIDM_B1950 = 20,
		SE_SIDM_SURYASIDDHANTA = 21,
		SE_SIDM_SURYASIDDHANTA_MSUN = 22,
		SE_SIDM_ARYABHATA = 23,
		SE_SIDM_ARYABHATA_MSUN = 24,
		SE_SIDM_SS_REVATI = 25,
		SE_SIDM_SS_CITRA = 26,
		SE_SIDM_TRUE_CITRA = 27,
		SE_SIDM_TRUE_REVATI = 28,
		SE_SIDM_TRUE_PUSHYA = 29,
		SE_SIDM_GALCENT_RGILBRAND = 30,
		SE_SIDM_GALEQU_IAU1958 = 31,
		SE_SIDM_GALEQU_TRUE = 32,
		SE_SIDM_GALEQU_MULA = 33,
		SE_SIDM_GALALIGN_MARDYKS = 34,
		SE_SIDM_TRUE_MULA = 35,
		SE_SIDM_GALCENT_MULA_WILHELM = 36,
		SE_SIDM_ARYABHATA_522 = 37,
		SE_SIDM_BABYL_BRITTON = 38,
		SE_SIDM_TRUE_SHEORAN = 39,
		SE_SIDM_GALCENT_COCHRANE = 40,
		SE_SIDM_GALEQU_FIORENZA = 41,
		SE_SIDM_VALENS_MOON = 42,
		SE_SIDM_LAHIRI_1940 = 43,
		SE_SIDM_LAHIRI_VP285 = 44,
		SE_SIDM_KRISHNAMURTI_VP291 = 45,
		SE_SIDM_LAHIRI_ICRC = 46,
		SE_SIDM_USER = 255,
		SE_NSIDM_PREDEF = 47,
		SE_NODBIT_MEAN = 1,
		SE_NODBIT_OSCU = 2,
		SE_NODBIT_OSCU_BAR = 4,
		SE_NODBIT_FOPOINT = 256,
		SEFLG_DEFAULTEPH = 2,
		SE_MAX_STNAME = 256,
		SE_ECL_CENTRAL = 1,
		SE_ECL_NONCENTRAL = 2,
		SE_ECL_TOTAL = 4,
		SE_ECL_ANNULAR = 8,
		SE_ECL_PARTIAL = 16,
		SE_ECL_ANNULAR_TOTAL = 32,
		SE_ECL_HYBRID = 32,
		SE_ECL_PENUMBRAL = 64,
		SE_ECL_ALLTYPES_SOLAR = 63,
		SE_ECL_ALLTYPES_LUNAR = 84,
		SE_ECL_VISIBLE = 128,
		SE_ECL_MAX_VISIBLE = 256,
		SE_ECL_1ST_VISIBLE = 512,
		SE_ECL_PARTBEG_VISIBLE = 512,
		SE_ECL_2ND_VISIBLE = 1024,
		SE_ECL_TOTBEG_VISIBLE = 1024,
		SE_ECL_3RD_VISIBLE = 2048,
		SE_ECL_TOTEND_VISIBLE = 2048,
		SE_ECL_4TH_VISIBLE = 4096,
		SE_ECL_PARTEND_VISIBLE = 4096,
		SE_ECL_PENUMBBEG_VISIBLE = 8192,
		SE_ECL_PENUMBEND_VISIBLE = 16384,
		SE_ECL_OCC_BEG_DAYLIGHT = 8192,
		SE_ECL_OCC_END_DAYLIGHT = 16384,
		SE_ECL_ONE_TRY = 32768,
		SE_CALC_RISE = 1,
		SE_CALC_SET = 2,
		SE_CALC_MTRANSIT = 4,
		SE_CALC_ITRANSIT = 8,
		SE_BIT_DISC_CENTER = 256,
		SE_BIT_DISC_BOTTOM = 8192,
		SE_BIT_GEOCTR_NO_ECL_LAT = 128,
		SE_BIT_NO_REFRACTION = 512,
		SE_BIT_CIVIL_TWILIGHT = 1024,
		SE_BIT_NAUTIC_TWILIGHT = 2048,
		SE_BIT_ASTRO_TWILIGHT = 4096,
		SE_BIT_FIXED_DISC_SIZE = 16384,
		SE_BIT_FORCE_SLOW_METHOD = 32768,
		SE_BIT_HINDU_RISING = 896,
		SE_ECL2HOR = 0,
		SE_EQU2HOR = 1,
		SE_HOR2ECL = 0,
		SE_HOR2EQU = 1,
		SE_TRUE_TO_APP = 0,
		SE_APP_TO_TRUE = 1,
		SE_DE_NUMBER = 431,
		SE_FNAME_DE200 = "de200.eph",
		SE_FNAME_DE403 = "de403.eph",
		SE_FNAME_DE404 = "de404.eph",
		SE_FNAME_DE405 = "de405.eph",
		SE_FNAME_DE406 = "de406.eph",
		SE_FNAME_DE431 = "de431.eph",
		SE_FNAME_DFT = "de431.eph",
		SE_FNAME_DFT2 = "de406.eph",
		SE_STARFILE_OLD = "fixstars.cat",
		SE_STARFILE = "sefstars.txt",
		SE_ASTNAMFILE = "seasnam.txt",
		SE_FICTFILE = "seorbel.txt",
		SE_SPLIT_DEG_ROUND_SEC = 1,
		SE_SPLIT_DEG_ROUND_MIN = 2,
		SE_SPLIT_DEG_ROUND_DEG = 4,
		SE_SPLIT_DEG_ZODIACAL = 8,
		SE_SPLIT_DEG_NAKSHATRA = 1024,
		SE_SPLIT_DEG_KEEP_SIGN = 16,
		SE_SPLIT_DEG_KEEP_DEG = 32,
		SE_HELIACAL_RISING = 1,
		SE_HELIACAL_SETTING = 2,
		SE_MORNING_FIRST = 1,
		SE_EVENING_LAST = 2,
		SE_EVENING_FIRST = 3,
		SE_MORNING_LAST = 4,
		SE_ACRONYCHAL_RISING = 5,
		SE_ACRONYCHAL_SETTING = 6,
		SE_COSMICAL_SETTING = 6,
		SE_HELFLAG_LONG_SEARCH = 128,
		SE_HELFLAG_HIGH_PRECISION = 256,
		SE_HELFLAG_OPTICAL_PARAMS = 512,
		SE_HELFLAG_NO_DETAILS = 1024,
		SE_HELFLAG_SEARCH_1_PERIOD = 2048,
		SE_HELFLAG_VISLIM_DARK = 4096,
		SE_HELFLAG_VISLIM_NOMOON = 8192,
		SE_HELFLAG_VISLIM_PHOTOPIC = 16384,
		SE_HELFLAG_VISLIM_SCOTOPIC = 32768,
		SE_HELFLAG_AV = 65536,
		SE_HELFLAG_AVKIND_VR = 65536,
		SE_HELFLAG_AVKIND_PTO = 131072,
		SE_HELFLAG_AVKIND_MIN7 = 262144,
		SE_HELFLAG_AVKIND_MIN9 = 524288,
		SE_HELFLAG_AVKIND = 983040,
		TJD_INVALID = 99999999,
		SIMULATE_VICTORVB = 1,
		SE_PHOTOPIC_FLAG = 0,
		SE_SCOTOPIC_FLAG = 1,
		SE_MIXEDOPIC_FLAG = 2,
		SE_TIDAL_DE200 = -23.8946,
		SE_TIDAL_DE403 = -25.58,
		SE_TIDAL_DE404 = -25.58,
		SE_TIDAL_DE405 = -25.826,
		SE_TIDAL_DE406 = -25.826,
		SE_TIDAL_DE421 = -25.85,
		SE_TIDAL_DE422 = -25.85,
		SE_TIDAL_DE430 = -25.82,
		SE_TIDAL_DE431 = -25.8,
		SE_TIDAL_26 = -26,
		SE_TIDAL_STEPHENSON_2016 = -25.85,
		SE_TIDAL_DEFAULT = -25.8,
		SE_TIDAL_AUTOMATIC = 999999,
		SE_TIDAL_MOSEPH = -25.58,
		SE_TIDAL_SWIEPH = -25.8,
		SE_TIDAL_JPLEPH = -25.8,
		SE_DELTAT_AUTOMATIC = 0.0000000001,
		SE_MODEL_DELTAT = 0,
		SE_MODEL_PREC_LONGTERM = 1,
		SE_MODEL_PREC_SHORTTERM = 2,
		SE_MODEL_NUT = 3,
		SE_MODEL_BIAS = 4,
		SE_MODEL_JPLHOR_MODE = 5,
		SE_MODEL_JPLHORA_MODE = 6,
		SE_MODEL_SIDT = 7,
		NSE_MODELS = 8,
		SEMOD_NPREC = 11,
		SEMOD_PREC_IAU_1976 = 1,
		SEMOD_PREC_LASKAR_1986 = 2,
		SEMOD_PREC_WILL_EPS_LASK = 3,
		SEMOD_PREC_WILLIAMS_1994 = 4,
		SEMOD_PREC_SIMON_1994 = 5,
		SEMOD_PREC_IAU_2000 = 6,
		SEMOD_PREC_BRETAGNON_2003 = 7,
		SEMOD_PREC_IAU_2006 = 8,
		SEMOD_PREC_VONDRAK_2011 = 9,
		SEMOD_PREC_OWEN_1990 = 10,
		SEMOD_PREC_NEWCOMB = 11,
		SEMOD_PREC_DEFAULT = 9,
		SEMOD_PREC_DEFAULT_SHORT = 9,
		SEMOD_NNUT = 5,
		SEMOD_NUT_IAU_1980 = 1,
		SEMOD_NUT_IAU_CORR_1987 = 2,
		SEMOD_NUT_IAU_2000A = 3,
		SEMOD_NUT_IAU_2000B = 4,
		SEMOD_NUT_WOOLARD = 5,
		SEMOD_NUT_DEFAULT = 4,
		SEMOD_NSIDT = 4,
		SEMOD_SIDT_IAU_1976 = 1,
		SEMOD_SIDT_IAU_2006 = 2,
		SEMOD_SIDT_IERS_CONV_2010 = 3,
		SEMOD_SIDT_LONGTERM = 4,
		SEMOD_SIDT_DEFAULT = 4,
		SEMOD_NBIAS = 3,
		SEMOD_BIAS_NONE = 1,
		SEMOD_BIAS_IAU2000 = 2,
		SEMOD_BIAS_IAU2006 = 3,
		SEMOD_BIAS_DEFAULT = 3,
		SEMOD_NJPLHOR = 2,
		SEMOD_JPLHOR_LONG_AGREEMENT = 1,
		SEMOD_JPLHOR_DEFAULT = 1,
		SEMOD_NJPLHORA = 3,
		SEMOD_JPLHORA_1 = 1,
		SEMOD_JPLHORA_2 = 2,
		SEMOD_JPLHORA_3 = 3,
		SEMOD_JPLHORA_DEFAULT = 3,
		SEMOD_NDELTAT = 5,
		SEMOD_DELTAT_STEPHENSON_MORRISON_1984 = 1,
		SEMOD_DELTAT_STEPHENSON_1997 = 2,
		SEMOD_DELTAT_STEPHENSON_MORRISON_2004 = 3,
		SEMOD_DELTAT_ESPENAK_MEEUS_2006 = 4,
		SEMOD_DELTAT_STEPHENSON_ETC_2016 = 5,
		SEMOD_DELTAT_DEFAULT = 5
	}
}
