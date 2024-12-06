import { useRef, useEffect, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence  } from "framer-motion";
import "../pages/HomepageStyle.css";
import Modal from "../pages/Modal.jsx";
import video3 from "/me11.mp4";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Homepage() {
  const controls = useAnimation();
  const sectionRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ text: "", image: "" });
  const [isInView, setIsInView] = useState(false);
  const aboutRef = useRef(null);
  const workRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 }, // Initial state (fade-in from below)
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }, // Fade-in animation
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }, // Fade-out animation
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
    }
  };

  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1 },
  };

  const handleCardClick = (text, image) => {
    setModalContent({ text, image });
    setIsModalOpen(true);
    console.log("clicked");
  };

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const textParentVariant = {
    hidden: { opacity: 1 }, // Default visible, so children will stagger
    visible: {
      transition: {
        staggerChildren: 0.5, // Time delay between each child animation
      },
    },
  };
  
  const textChildVariant = {
    hidden: { opacity: 0, y: 20 }, // Initial state: fade out and move down
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, // Pop-up effect
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        } else {
          controls.start("hidden"); // Reset animation when leaving the viewport
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => {
      card.addEventListener("touchstart", function () {
        card.classList.add("card-hover");
      });

      card.addEventListener("touchend", function () {
        card.classList.remove("card-hover");
      });
    });

    

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("touchstart", function () {
          card.classList.add("card-hover");
        });

        card.removeEventListener("touchend", function () {
          card.classList.remove("card-hover");
        });
      });
    };
  }, []);

  
  return (
    <div className="scroll-container" style={{ width: "100%", padding: 0, margin: 0, minWidth: "390px" }}>
      <AnimatePresence>
      <motion.section className="section-container scroll-section" 
      
       >
        <div
          className="div-container"
          style={{ minWidth: "300px", display: "flex", alignItems: "center" }}
        >
          <motion.div
            variants={textParentVariant}
            initial="hidden"
            animate="visible"
            
          >
            <motion.h1 style={{ fontSize: "2.8rem" }}  variants={textChildVariant}>Hello world, my name is</motion.h1>
            <motion.h1 style={styles.specialText} variants={textChildVariant} >Cledwyn</motion.h1>
            <motion.h1 style={{ fontSize: "1.8rem", paddingTop: "20px" }}  variants={textChildVariant}>
              I am pursuing Computer Science (AI) with <br></br> a second major
              in Business Analytics
            </motion.h1>
          </motion.div>
        </div>
        <div
          className="div-container"
          style={{
            minWidth: "390px",
            minHeight: "500px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.img
            src="./me1.jpg"
            className="img-fluid"
            style={{
              width: "80%",
              height: "80%",
              objectFit: "cover",
              borderRadius: "50px",
              marginBottom: "3%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.01,
              },
            }}
          />
        </div>
      </motion.section>

      <motion.section
       
        id="about"
        className="section-container scroll1-section"
        style={{
          scrollMarginTop: "30px",
          position: "relative",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
            filter: "brightness(0.8)",
            pointerEvents: "none",
          }}
        >
          <source src="./vid1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingTop: "10%",
          }}
        >
          <h1 style={styles.specialText2}>About Me</h1>
        </div>
        <div
          className="about-container"
          style={{ minWidth: "400px", display: "flex", alignItems: "center" }}
        >
          <motion.div
            style={{
              ...styles.containerCard1,
            }}
            initial="hidden"
          >
            <motion.div className="card" style={styles.card}>
              <div
                className="card-body"
                style={{ marginBottom: "50px", paddingTop: "40px" }}
              >
                <div style={{ marginBottom: "50px" }}>
                  <h2 className="card-title" style={{ fontStyle: "italic" }}>
                    My Passion
                  </h2>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p className="card-text" style={{ fontSize: "1.2rem" }}>
                    I am passionate about artificial intelligence and software
                    development, inspired by technology’s potential to transform
                    lives and industries. I enjoy tackling challenges like
                    designing intuitive interfaces, building scalable systems,
                    and addressing AI’s ethical implications. My curiosity
                    drives continuous learning as I explore emerging trends and
                    tools. With a creative, problem-solving mindset, I aim to
                    build impactful, innovative solutions in this dynamic field.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div className="card" style={styles.card}>
              <div
                className="card-body"
                style={{ marginBottom: "50px", paddingTop: "40px" }}
              >
                <div style={{ marginBottom: "50px" }}>
                  <h2 className="card-title" style={{ fontStyle: "italic" }}>
                    My Hobbies
                  </h2>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p className="card-text" style={{ fontSize: "1.2rem" }}>
                    In my free time, I enjoy traveling, with a special love for
                    visiting Korea and exploring its culture. I’m also an active
                    person who loves playing football and tennis, and I have a
                    strong passion for gymming to stay fit and energized.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div className="card" style={styles.card}>
              <div
                className="card-body"
                style={{ marginBottom: "50px", paddingTop: "40px" }}
              >
                <div style={{ marginBottom: "50px" }}>
                  <h2 className="card-title" style={{ fontStyle: "italic" }}>
                    More About Me
                  </h2>
                </div>
                <div style={{ textAlign: "left" }}>
                  <p className="card-text" style={{ fontSize: "1.2rem" }}>
                    I am currently in my sophomore year in Singapore Management
                    University, pursing the bachelor's degree of Computer
                    Science specialised in AI with a 2nd major in Business
                    Analytics.
                  </p>
                </div>
                <div style={{ marginTop: "50px" }}>
                  <a
                    href="https://www.linkedin.com/in/cledwyn-chan/"
                    target="_blank"
                    className="btn btn-primary"
                  >
                    My linkedin!
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        
        id="experience"
        className="working-section-container animated-background scroll-section"
        style={{
          scrollMarginTop: "30px",
          position: "relative",
        }}
        ref={workRef}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingBottom: "30px",
          }}
        >
          <h1 style={styles.specialText}>Working Experience</h1>
        </div>
        <div
          className="working-container"
          style={{ minWidth: "400px", display: "flex", alignItems: "center" }}
        >
          <motion.div
            style={{
              width: "100%",
              height: "70%",
            }}
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            <div id="expContainer" style={{ ...styles.display }}>
              <motion.div
                className="card"
                style={{ ...styles.cardContainer }}
                onClick={() =>
                  handleCardClick(
                    "As a retail associate at Nike, I provided top-tier customer service, assisting customers with product selection, offering personalized recommendations, and ensuring an exceptional in-store experience. I was responsible for maintaining an organized and visually appealing sales floor, handling transactions efficiently, and staying up-to-date with product knowledge to promote the latest merchandise. My role also included contributing to sales targets, managing stock, and fostering a positive, team-oriented environment to enhance customer satisfaction and loyalty.",
                    "./nike2.jpg"
                  )
                }
              >
                <img src="./nike.jpeg" style={styles.cardImg} />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  <h3 className="heading">Nike</h3>
                  <h4 className="sub-head">Sales Associate</h4>
                  <h5 className="year">Mar 2023 - Sep 2023</h5>
                  <p></p>
                </div>
              </motion.div>

              <motion.div
                className="card"
                style={{ ...styles.cardContainer, minHeight: "400px" }}
                onClick={() =>
                  handleCardClick(
                    "During the Artbox 2023 expo exhibition, I worked as a salesperson for Oatbedient, where I quickly adapted to the fast-paced environment and effectively engaged with visitors. My ability to grasp new information swiftly allowed me to confidently present our products and address customer inquiries. This not only enhanced the company’s visibility at the event but also earned me positive feedback from my manager, who appreciated my enthusiasm and quick learning ability. My performance contributed to a successful exhibition, showcasing my aptitude for sales and client interaction.",
                    "./oat2.PNG"
                  )
                }
              >
                <img src="./oat.jpeg" style={{ ...styles.cardImg }} />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  <h3 className="heading">Oatbedient</h3>
                  <h4 className="sub-head">Promoter</h4>
                  <h5 className="year">Jan 2023 - Feb 2023</h5>
                  <p></p>
                </div>
              </motion.div>

              <motion.div
                {...fadeIn}
                className="card"
                style={{ ...styles.cardContainer }}
                onClick={() =>
                  handleCardClick(
                    "Led a platoon of 15 in executing various high-stakes missions, including the National Day Parade (NDP). Additionally, played a key role in managing the networking infrastructure, ensuring seamless connectivity between critical equipment, such as establishing and maintaining reliable connections between cameras and the server.",
                    "./army2.jpg"
                  )
                }
              >
                <img
                  src="./army.jpeg"
                  style={{ ...styles.cardImg, minHeight: "400px" }}
                />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  <h3 className="heading">15C4I, SAF</h3>
                  <h4 className="sub-head">Platoon Sergeant</h4>
                  <h5 className="year">Oct 2021 - Nov 2022</h5>
                  <p></p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
     
        id="education"
        className="edu-section-container animated-background-star scroll-section"
        style={{
          scrollMarginTop: "30px",
          position: "relative",
        }}
      >
        <div class="stars">
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
          <div class="star"></div>
        </div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingBottom: "30px",
            paddingTop: "30px",
          }}
        >
          <h1 style={styles.specialText3}>Education</h1>
        </div>
        <div
          className="edu-container"
          style={{
            minWidth: "400px",
            display: "flex",
            flexWrap: "wrap",
            padding: "5%",
            color: "white",
            justifyContent: "space-between",
            zIndex: "1",
          }}
        >
          <div
            style={{
              width: "40%",
              minWidth: "370px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "40%", minWidth: "100px" }}>
              <img
                src="./scis.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "150px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Singapore Management University</h3>
              <h5>Computer Science (AI) </h5>
              <h6>Aug 2023 - Jun 2027</h6>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              minWidth: "370px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "40%", minWidth: "100px" }}>
              <img
                src="./CJC.png"
                style={{
                  width: "90%",
                  minWidth: "100px",
                  borderRadius: "150px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Catholic Junior College</h3>
              <h5>Student</h5>
              <h6>Jan 2019 - Dec 2020</h6>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              minWidth: "370px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "40%", minWidth: "100px" }}>
              <img
                src="./manjuju.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "150px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Manjusri Secondary School</h3>
              <h5>Student</h5>
              <h6>Jan 2015 - Nov 2018</h6>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
     
        id="skills"
        className="skill-section-container scroll1-section"
        style={{
          scrollMarginTop: "30px",
          position: "relative",
        }}
      >
        <div
          class="snow"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 0 }}
        ></div>
        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingBottom: "30px",
            zIndex: 1,
          }}
        >
          <h1 style={styles.specialText3}>Skills</h1>
        </div>
        <div
          className="edu-container"
          style={{
            width: "100%",
            minWidth: "400px",
            display: "flex",
            flexWrap: "wrap",
            padding: "5%",
            color: "white",
            justifyContent: "space-evenly",
            gap: "20px",
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
          }}
        >
          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./react.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>React</h3>
              <h5>
                Frontend Development with various frameworks (Vite, Next.js){" "}
              </h5>
            </div>
          </div>

          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./JavaScript-logo.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>JavaScript</h3>
              <h5>
                Self-taught Java script programming for web app developments and
                fullstack
              </h5>
            </div>
          </div>

          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./mysql.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>MySQL</h3>
              <h5>
                Experienced in managing databases and creating an efficient and
                secure database
              </h5>
            </div>
          </div>

          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./spring.webp"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>SpringBoot</h3>
              <h5>
                Experienced in backend programming with SpringBoot and RESTful
                apis
              </h5>
            </div>
          </div>

          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./java2.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "30px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Java</h3>
              <h5>
                Advanced Java knowledge in terms of OOP and backend development
              </h5>
            </div>
          </div>

          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./htmlcss.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>HTML n CSS</h3>
              <h5>
                Experience in Web developement with HTML and CSS and different
                libraries
              </h5>
            </div>
          </div>

          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./c.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>C</h3>
              <h5>Basic C knowledge for OS programming</h5>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./python.jpeg"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Python</h3>
              <h5>
                Experienced using python for simple data analysis and training
                basic models
              </h5>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./figma.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Figma</h3>
              <h5>
                Intermediate level in designing UI/UX with Figma for web
              </h5>
            </div>
          </div>
          <div
            style={{
              width: "40%",
              minWidth: "350px",
              height: "30%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div style={{ width: "30%", minWidth: "100px" }}>
              <img
                src="./jira.png"
                style={{
                  width: "100%",
                  minWidth: "100px",
                  borderRadius: "50px",
                }}
              />
            </div>
            <div style={{ width: "90%", marginLeft: "5%" }}>
              <h3>Jira</h3>
              <h5>
                Experienced in project management and agile development with Jira
              </h5>
            </div>
          </div>
          
          
        </div>
      </motion.section>

      <motion.section
      
      viewport={{ once: false, amount: 0.8 }}
        id="project"
        className="project-section-container animated-black-background scroll1-section"
        ref={aboutRef}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingTop: "5%",
            marginBottom: "50px",
            height:"auto",
      
          }}
        >
          <h1 style={{ ...styles.specialText3 }}> Projects</h1>
        </div>
          <div style={{width:"100%", minWidth:"400px"}}>
            <div className="specialDiv" style={{width:"100%", minWidth:"390px", marginBottom:"50px"}}>
              <h3 style={{ ...styles.specialText3, fontSize:"2.5rem" }}> Upcoming Projects</h3>
            </div>
            <div style={{width:"100%",minWidth:"400px", display:"flex", justifyContent:"flex-start", gap:"50px", flexWrap:"wrap"}}>
              <a target="_blank" href="https://www.maritimestudies.nus.edu.sg/maritime-hackathon-2025/" style={{width:"30%", minWidth:"390px"}}>
              <motion.div
                className="card"
                style={{ ...styles.cardContainer,width:"100%",minHeight:"200px" }}
                // onClick={() =>
                //   handleCardClick(
                //     "As a retail associate at Nike, I provided top-tier customer service, assisting customers with product selection, offering personalized recommendations, and ensuring an exceptional in-store experience. I was responsible for maintaining an organized and visually appealing sales floor, handling transactions efficiently, and staying up-to-date with product knowledge to promote the latest merchandise. My role also included contributing to sales targets, managing stock, and fostering a positive, team-oriented environment to enhance customer satisfaction and loyalty.",
                //     "./nike2.jpg"
                //   )
                // }
              >
                <img src="./hackathon25.png" style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0  }} />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  
                  <h3 className="heading">NUS CMS Maritime Hackathon</h3>
                  <h4 className="sub-head">Participant</h4>
                  <h5 className="year">17 Jan 2025 - 18 Jan 2025</h5>
                  <p></p>
                </div>
              </motion.div>
              </a>

              <a target="_blank" href="https://www.accenture.com/sg-en/careers/local/university-innovation-challenge" style={{width:"30%", minWidth:"390px"}}>
              <motion.div
                className="card"
                style={{ ...styles.cardContainer,width:"100%",minHeight:"200px" }}
                // onClick={() =>
                //   handleCardClick(
                //     "As a retail associate at Nike, I provided top-tier customer service, assisting customers with product selection, offering personalized recommendations, and ensuring an exceptional in-store experience. I was responsible for maintaining an organized and visually appealing sales floor, handling transactions efficiently, and staying up-to-date with product knowledge to promote the latest merchandise. My role also included contributing to sales targets, managing stock, and fostering a positive, team-oriented environment to enhance customer satisfaction and loyalty.",
                //     "./nike2.jpg"
                //   )
                // }
              >
                <img src="./accenture.png" style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  
                  <h3 className="heading">Accenture Innovation Challenge</h3>
                  <h4 className="sub-head">Participant</h4>
                  <h5 className="year">6 Jan 2025 - 17 Jan 2025</h5>
                  <p></p>
                </div>
              </motion.div>
              </a>
            </div>
            <div className="specialDiv" style={{width:"100%", minWidth:"390px", marginBottom:"50px", marginTop:"50px"}}>
              <h3 style={{ ...styles.specialText3, fontSize:"2.5rem" }}> Completed Projects</h3>
            </div>
            <div style={{width:"100%",minWidth:"400px", display:"flex", justifyContent:"flex-start", gap:"50px", flexWrap:"wrap"}}>
              <a target="_blank" href="https://github.com/cledwynchan2023/CS203_Proj" style={{width:"30%", minWidth:"390px"}}>
              <motion.div
                className="card"
                style={{ ...styles.cardContainer,width:"100%",minHeight:"200px" }}
                // onClick={() =>
                //   handleCardClick(
                //     "As a retail associate at Nike, I provided top-tier customer service, assisting customers with product selection, offering personalized recommendations, and ensuring an exceptional in-store experience. I was responsible for maintaining an organized and visually appealing sales floor, handling transactions efficiently, and staying up-to-date with product knowledge to promote the latest merchandise. My role also included contributing to sales targets, managing stock, and fostering a positive, team-oriented environment to enhance customer satisfaction and loyalty.",
                //     "./nike2.jpg"
                //   )
                // }
              >
                <img src="./chess.png" style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0  }} />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  
                  <h3 className="heading">CS203 Full Stack Development</h3>
                  <h4 className="sub-head">Chess Tournament Website</h4>
                  <h5 className="year">Year 2 Sem 1</h5>
                  <p></p>
                </div>
              </motion.div>
              </a>

              <a target="_blank" href="https://ellipsis.sis.smu.edu.sg/tech-series" style={{width:"30%", minWidth:"390px"}}>
              <motion.div
                className="card"
                style={{ ...styles.cardContainer,width:"100%",minHeight:"200px" }}
                // onClick={() =>
                //   handleCardClick(
                //     "As a retail associate at Nike, I provided top-tier customer service, assisting customers with product selection, offering personalized recommendations, and ensuring an exceptional in-store experience. I was responsible for maintaining an organized and visually appealing sales floor, handling transactions efficiently, and staying up-to-date with product knowledge to promote the latest merchandise. My role also included contributing to sales targets, managing stock, and fostering a positive, team-oriented environment to enhance customer satisfaction and loyalty.",
                //     "./nike2.jpg"
                //   )
                // }
              >
                <img src="./techseries.png" style={{width: "100%", height: "100%", objectFit: "cover", position: "absolute", top: 0, left: 0 }} />
                <div className="layer"></div>
                <div className="info" style={{ color: "white" }}>
                  
                  <h3 className="heading">SMU Ellipsis Tech Series</h3>
                  <h4 className="sub-head">Participant (Top 30)</h4>
                  <h5 className="year">28 Sep 2024 - 2 Sep 2024</h5>
                  <p></p>
                </div>
              </motion.div>
              </a>
            </div>

          </div>
        
  
      </motion.section>

      <motion.section
        id="contact"
        className="contact-section-container skyanimation scroll1-section"
        ref={aboutRef}
      >
        <div
          style={{
            width: "100%",
            textAlign: "center",
            paddingTop: "5%",
            marginBottom: "50px",

          }}
        >
          <h1 style={{ ...styles.specialText4 }}> Contact</h1>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            minWidth: "400px",
  
          }}
        >
          <div
            style={{
              width: "50%",
              minWidth: "380px",
              display: "flex",
              alignItems: "center",
              paddingBottom:"5%"
            
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
            >
              <h4 style={{ fontSize: "1.8rem", color: "white", fontWeight:"400" }}>
                Want to know more about me?
              </h4>
              <h1 style={styles.specialText3}>
                Get in touch with me via these platforms!
              </h1>
              <div style={{ marginTop: "80px" }}>
                <a
                  href="https://www.instagram.com/cledwyn__"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram style={{ color: "white" }} size={80} />
                </a>
                <a
                  href="https://www.linkedin.com/in/cledwyn-chan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "5%" }}
                >
                  <FaLinkedin style={{ color: "white" }} size={80} />
                </a>
                <a
                  href="mailto:cledwynchan@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginLeft: "5%" }}
                >
                  <MdEmail style={{ color: "white" }} size={80} />
                </a>
              </div>
            </motion.div>
          </div>
          <div
            style={{
              width: "50%",
              minWidth: "380px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* <motion.video
              ref={videoRef}
              muted={isMuted}
              src={video3}
              style={{
                objectFit: "cover",
                height: "500px",
                width: "80%",
                minWidth:"400px",
                marginTop: "20px",
                borderRadius: "30px",
              }}
              autoPlay
              loop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2 }}
              onClick={toggleMute}
            ></motion.video> */}
            <motion.img
            src="./me22.jpeg"
            
            style={{
              width: "70%",
              minWidth:"400px",
              height: "80%",
              objectFit: "cover",
              borderRadius: "50px",
              marginBottom: "3%",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0, 0.71, 0.2, 1.01],
              scale: {
                type: "spring",
                damping: 5,
                stiffness: 100,
                restDelta: 0.01,
              },
            }}
          />
          </div>
        </div>
      </motion.section>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        content={modalContent}
      />
      <footer
        className="footer"
        style={{ textAlign: "center", height: "100px" }}
      >
        <p>&copy; 2024 Cledwyn. All rights reserved.</p>
      </footer>
      </AnimatePresence>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    flexWrap: "wrap",
    marginTop: "2%",
    height: "110vh",
    scrollMarginTop: "20px",
  },
  containerCard: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    marginTop: "6%",
    height: "100vh",
    minHeight: "500px",
    maxHeight: "600px",
    marginBottom: "5%",
  },

  containerCard1: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },

  specialText: {
    fontSize: "4rem",
    backgroundImage: "url('./bg8.jpeg')",
    backgroundPosition: "center",
    backgroundClip: "text",
    color: "transparent",
  },

  specialText2: {
    fontSize: "4rem",
    backgroundImage: "url('./bg10.jpeg')",
    backgroundPosition: "top",
    backgroundClip: "text",
    color: "transparent",
  },

  specialText3: {
    fontSize: "4rem",
    backgroundImage: "url('./bg5.jpeg')",
    backgroundPosition: "top",
    backgroundClip: "text",
    color: "transparent",
  },

  specialText4: {
    fontSize: "4rem",
    backgroundImage: "url('./bg5.jpeg')",
    backgroundPosition: "left",
    backgroundClip: "text",
    color: "transparent",
  },

  specialText5: {
    fontSize: "4rem",
    backgroundImage: "url('./Bg2.jpeg')",
    backgroundPosition: "top",
    backgroundClip: "text",
    color: "transparent",
  },

  card: {
    width: "30%",
    minWidth: "350px",
    marginBottom: "2%",
    borderRadius: "30px",
    textAlign: "center",
    height: "auto",
    marginTop: "5%",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    fontfamily: "sans-serif",
  },

  display: {
    display: "flex",
    justifyContent: "space-evenly",
    gap: "5%",
    overscrollBehaviorX: "contain",
    scrollSnapType: "x mandatory",
    scrollBarWidth: "none",
    width: "100%",
    height: "100%",
  },

  cardContainer: {
    width: "40%",
    height: "100%",
    minWidth: "300px",

    minHeight: "300px",

    borderRadius: " 35px",
    overflow: "hidden",
    position: "relative",
    transition: "0.5s",
  },

  cardImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "0.5s",
  },

  cardSkillContainer: {
    width: "200px",
    height: "200px",
    minWidth: "200px",
    maxWidth: "200px",
    minHeight: "200px",
    maxheight: "200px",
    borderRadius: " 35px",
    overflow: "hidden",
    position: "relative",
    transition: "0.5s",
  },
};
