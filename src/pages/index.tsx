import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Code2,
  Frame,
  MonitorSmartphone,
  GraduationCap,
  Briefcase,
  Facebook,
  Linkedin,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Spline from "@splinetool/react-spline";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem, 
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import DarkModeToggle from "@/components/DarkModeToggle";
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, } from "react-icons/fa";
import { Typewriter } from 'react-simple-typewriter';





const experience = [

  {
    title: "Graduated From University of Perpetual Help GMA",
    location: "Remulla Sports Complex, San Agustin St, General Mariano",
    description: "I graduated after 2 years of studying as Science, Technology, Engineering, and Mathematics ",
    icon:  <GraduationCap />,
    date: "2017-2019",
  },

  {
    title: "Graduated From Philippine Christian University",
    location: "Emilio Aguinaldo Hwy, Dasmariñas, 4114 Cavite",
    description: "I graduated after 4 years of studying as Computer Engineer Student",
    icon: <GraduationCap />,
    date: "2019-2024",
  },
  {
    title: "Magnetica Electronics, Inc.",
    location: "059 Governor Camerino Compound, 1-D Medicion, Imus, 4103",
    description: "I worked as a Embedded Software Engineer intern for 3 months.",
    icon:  <Briefcase />,
    date: "Feb 2024 - May 2024",
  },
];

const fadeInAnimationVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
    },
  }),
};

const lineColor = '#3A56A7';


const projects = [
  {
    title: "This website",
    description: "My personal website",
    image: "/assets/website_porfolio.webm",
    href: "",
  },
  {
    title: "",
    description: "",
    image: "",
    href: "#",
  },
  {
    title: "",
    description: "",
    image: "",
    href: "",
  },
];

const services = [
  {
    service: "Frontend Development",
    description:
      "Creating stellar user interfaces and web experiences using the latest technologies.",
    icon: Code2,
  },
  {
    service: "UX Design",
    description:
      "Building intuitive, user-centric designs that drive engagement and conversion.",
    icon: Frame,
  },
  {
    service: "Responsive Design",
    description:
      "Designing websites that look and perform equally well on all devices and screen sizes.",
    icon: MonitorSmartphone,
  },
];


const skills = [
  { name: "HTML", icon: FaHtml5, color: "#E44D26" },
  { name: "CSS", icon: FaCss3Alt, color: "#264DE4" },
  { name: "JavaScript", icon: FaJs, color: "#F0DB4F" },
  { name: "TypeScript", icon: FaJs, color: "#007ACC" }, 
  { name: "React", icon: FaReact, color: "#61DAFB" },
  { name: "Next.js", icon: FaNodeJs, color: "#000000" },
];



export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);
  

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

 {/* Dark mode toggle */}
 <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

       {/* Intro */}
<section
  id="home"
  data-scroll-section
  className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
>
  <div className={styles.intro}>
    <div
      data-scroll
      data-scroll-direction="horizontal"
      data-scroll-speed=".09"
      className="flex flex-row items-center space-x-1.5"
    ></div>
    <div>
      <h1
        data-scroll
        data-scroll-enable-touch-speed
        data-scroll-speed=".06"
        data-scroll-direction="horizontal"
      >
        <span className="text-6xl tracking-tighter  2xl:text-8xl">
          Hello, I&apos;m
          <br />
        </span>
        <span className="clash-grotesk text-6xl 2xl:text-8xl">
          Cedric Bides
        </span>
      </h1>
      <p
        data-scroll
        data-scroll-enable-touch-speed
        data-scroll-speed=".06"
        className="mt-1 max-w-lg tracking-tight 2xl:text-xl"
      >
       <Typewriter
  words={[
    'An experienced front-end developer with a passion for creating engaging and unique digital interfaces.',
    'Loves turning ideas into reality through code.',
    'Always learning and exploring new technologies.'
  ]}
  loop={false}
  cursor
  cursorStyle="_"
  typeSpeed={70}
  deleteSpeed={50}
  delaySpeed={1000}
/>
      </p>
    </div>
    <span

      data-scroll
      data-scroll-enable-touch-speed
      data-scroll-speed=".06"
      className="flex flex-row items-center space-x-1.5 pt-6"
    >
      <Link href="mailto:bidescedric@gmail.com" passHref>
        <Button>
          Get in touch <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </Link>

      <Button
        variant="outline"
        onClick={() => scrollTo(document.querySelector("#about"))}
      >
        Learn more
      </Button>
      {/* Icons */}
      <Link href="https://www.linkedin.com/in/john-leonard-cedric-bides-5a06362a1/" target="_blank" passHref>
         <Linkedin  className="ml-4 h-6 w-6 -700" />
      </Link>
      <Link href="https://www.facebook.com/cedric.bides.7/" target="_blank" passHref>
      <Facebook className="ml-4 h-6 w-6 -600" />
      </Link>
    </span>

    <div
      className={cn(
        styles.scroll,
        isScrolled && styles["scroll--hidden"],
      )}
    >
      Scroll to discover{" "}
      <TriangleDownIcon className="mt-1 animate-bounce" />
    </div>
  </div>
  <div
    data-scroll
    data-scroll-speed="-.01"
    id={styles["canvas-container"]}
    className="mt-14 h-full w-full xl:mt-0"
  >
    <Suspense fallback={<span>Loading...</span>}>
      <Spline scene="/assets/destiny.spline" />
    </Suspense>
  </div>
</section>

{/* About */}
<section id="about" data-scroll-section className="my-32">
  <div
    data-scroll
    data-scroll-speed=".4"
    data-scroll-position="top"
    className="flex max-w-6xl flex-col justify-start space-y-10"
  >
    <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter xl:text-[40px]">
      {" "}
      <Link
        href="https://create.t3.gg/"
        target="_blank"
        className="underline"
      >
    
      </Link>{" "}
      As a recent graduate in Computer Engineering, I am fueled by a relentless passion for technology and a drive to excel in the world of programming. With a solid foundation in computer science principles and hands-on experience gained through my academic journey, I am eager to embark on a career where I can apply my skills to real-world challenges.
    </h2>

  </div>
</section>

{/* Projects */}
<section id="projects" data-scroll-section className="my-32">
  {/* Gradient */}
  <div className="relative isolate -z-10">
    <div
      className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
      aria-hidden="true"
    >
      <div
        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        style={{
          clipPath:
            "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
        }}
      />
    </div>
  </div>
  <div data-scroll data-scroll-speed=".4" className="my-64">
    
    <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl clash-grotesk">
    optimized digital journeys
    </h2>
    <p className="mt-1.5 text-base tracking- xl:text-lg ">
    I&apos;ve  had the opportunity to contribute to a diverse range of projects, spanning from individual websites to extensive web applications. Below are some of the projects I&apos;ve 've particularly enjoyed working on:
    </p>

    {/* Carousel */}
    <div className="mt-14">
      <Carousel setApi={setCarouselApi} className="w-full">
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.title} className="md:basis-1/2">
              <Card id="tilt">
                <CardHeader className="p-0">
                  <Link href={project.href} target="_blank" passHref>
                    {project.image.endsWith(".webm") ? (
                      <video
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                      />
                    ) : (
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={300}
                        quality={100}
                        className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                      />
                    )}
                  </Link>
                </CardHeader>
                <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                  <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                    {project.description}
                  </CardTitle>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="py-2 text-center text-sm ">
        <span className="font-semibold">
          {current} / {count}
        </span>{" "}
        projects
      </div>
    </div>
  </div>
</section>

{/* Services */}

<section id="services" data-scroll-section className="my-32">
  <div
    data-scroll
    data-scroll-speed=".4"
    data-scroll-position="top"
    className="flex flex-col justify-start space-y-10"
  >
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 1,
        staggerChildren: 0.5,
      }}
      viewport={{ once: true }}
      className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
    >
      <div className="flex flex-col py-6 xl:p-6">
        <h2 className="text-4xl font-medium tracking-tight">
          Need more info?
          <br />
          <span className="clash-grotesk tracking-normal">
            I got you.
          </span>
        </h2>
        <p className="mt-2 tracking-tighter">
          Here are some of the services I offer. If you have any questions, feel free to reach out.
        </p>
      </div>
      {services.map((service) => (
        <div
          key={service.service}
          className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:shadow-md hover-bg-purple"
        >
          <service.icon className="my-6 clash-grotesk" size={20} />
          <span className="text-lg tracking-tight">
            {service.service}
          </span>
          <span className="mt-2 tracking-tighter">
            {service.description}
          </span>
        </div>
      ))}
    </motion.div>
  </div>
</section>


{/* Experience */}

<section id="experience" data-scroll-section className="my-32 ">
  <div
    data-scroll
    data-scroll-speed=".4"
    data-scroll-position="top"
    className="flex flex-col justify-start space-y-10"
  >
    <div className="text-center">
      <h2 className="text-4xl font-semibold tracking-tight mb-6 clash-grotesk">Experience</h2>
    </div>
    <VerticalTimeline lineColor={lineColor}> {/* Pass the line color variable */}
      {experience.map((exp, index) => (
        <VerticalTimelineElement
          visible={true}
          key={index}
          date={exp.date}
          iconStyle={{ background: '#3A56A7', color: '#fff' }}
          icon={exp.icon}
          className={styles.timelineElement} 
        >
          <h3 className="vertical-timeline-element-title">{exp.title}</h3>
          <h4 className="vertical-timeline-element-subtitle">{exp.location}</h4>
          <p>{exp.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </div>
</section>
    

{/* Contact */}
<section id="contact" data-scroll-section className="my-64">
  <div
    data-scroll
    data-scroll-speed=".4"
    data-scroll-position="top"
    className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
  >
    <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
      Let&apos;s work{" "}
      <span className="clash-grotesk">together.</span>
    </h2>
    <p className="mt-1.5 text-base tracking-tight xl:text-lg">
      I&apos;m currently available for work and open to jobs.
    </p>
    <Link href="mailto:bidescedric@gmail.com" passHref>
      <Button className="mt-6">Contact Me</Button>
    </Link>
  </div>
</section>



{/* Skills */}

<section id="skills" data-scroll-section className="my-32">
<div className="text-center">
</div>
<ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
  {skills.map((skill, index) => {
    const Icon = skill.icon; // Extracting the icon component
    return (
      <motion.li
        className="flex items-center bg-white borderBlack rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
        key={index}
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        custom={index}
      >
        <Icon className="w-6 h-6 mr-2" style={{ color: skill.color }} /> {/* Using React icons for all skills */}
        <span>{skill.name}</span>
      </motion.li>
    );
  })}
</ul>
</section>

</div>
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}