export const Skill_data = [
    {
        skill_name: "npm",
        Image: "/icons/Skills/npm.png",
        width: 55,
        height: 55,
    },
];

export const Socials = [
    {
        name: "Instagram",
        src: "/icons/instagram.svg",
        link: "https://www.instagram.com/_.wenzi._/"
    },
    {
        name: "Email",
        src: "/icons/emailicon.png",
        link: "mailto:wlee298@wisc.edu"
    },
    {
        name: "Linkedin",
        src: "/icons/linkedin.png",
        link: "https://linkedin.com/in/lee-wen-jie-042baa267",
    },
    {
        name: "github",
        src: "/icons/github.png",
        link: "https://github.com/wenjielee11/",
    }
]

export const Frontend_skill = [
    {
        skill_name: "Html 5",
        Image: "icons/Skills/html.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Css",
        Image: "icons/Skills/css.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Java Script",
        Image: "icons/Skills/js.png",
        width: 65,
        height: 65,
    },
    {
        skill_name: "Tailwind Css",
        Image: "icons/Skills/tailwind.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "React",
        Image: "icons/Skills/react.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Material UI",
        Image: "icons/Skills/mui.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "threejs",
        Image: "icons/Skills/threejs.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "react-three-fiber",
        Image: "icons/Skills/r3f.png",
        width: 80,
        height: 80,
    },
];

export const Backend_skill = [
    {
        skill_name: "Next.js",
        Image: "icons/Skills/next.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "express",
        Image: "icons/Skills/express.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Node js",
        Image: "icons/Skills/node-js.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Google Cloud Platform",
        Image: "icons/Skills/google-cloud.svg",
        width: 80,
        height: 80,
    },
    {
        skill_name: "my SQL",
        Image: "icons/Skills/mysql.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Cassandra",
        Image: "icons/Skills/cassandra.png",
        width: 100,
        height: 100,
    },
    {
        skill_name: "Kafka",
        Image: "icons/Skills/Apache_kafka.png",
        width: 100,
        height: 100,
    },
    {
        skill_name: "Apache Spark",
        Image: "icons/Skills/spark.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Docker",
        Image: "icons/Skills/docker.png",
        width: 80,
        height: 80,
    },
    {
        skill_name: "Hadoop",
        Image: "icons/Skills/hadoop.svg",
        width: 80,
        height: 80,
    },
    {
        skill_name: "BigQuery",
        Image: "icons/Skills/bigquery.svg",
        width: 80,
        height: 80,
    },
    {
        skill_name: "MongoDB",
        Image: "icons/Skills/mongodb.png",
        width: 100,
        height: 100,
    },
];

export const Projects = [
    {
        name: "CanT-cer: Pioneering Skin Cancer Data Generation to Combat AI Bias",
        image: "/projects/cantcer.jpg",
        description: ` 
        As the Fullstack developer, I helped develop a web app to address the need for synthetic medical datasets of diverse skin tones in cancer diagnosis, utilizing flask and Google Colab to deploy custom AI model pipelines for skin lesion classification, segmentation, and style transfer. 
        I also streamlined an Express RESTful API architecture to facilitate data transmission. 
        I implemented server-sided image encoding, file bundling and compression, enabling efficient exports of generated datasets in .ZIP format. 
        Furthermore, I integrated server responses into a React and Bootstrap UI. 
        I also succesfully deployed the web service on Google Cloud App Engine. 
        Overall, it was a great learning experience for web development. 
        Awarded Best use of Google Cloud by Major League Hacking (MLH) in MadHacks Fall 2023`,
        link: "https://devpost.com/software/cant-cer"
    },
    {
        name: "Cornucopia: Uniting Small-Scale Farmers With Community Supported Agriculture (CSA)",
        image: "/projects/cornucopia.png",
        description: `
As the Full-Stack Developer for "Cornucopia," I played a role in creating a web application that connects small-scale farmers with local markets through a Community Supported Agriculture (CSA). 
Utilizing React and Next.js, I crafted an intuitive interface with Tailwind CSS for easy navigation. 
My key contributions included integrating a lasso regression model to recommend optimal crop prices, 
employing MongoDB Atlas for real-time inventory and logistics management, and overcoming the team's web development learning curve by promoting parallel development, by leading the implementation of skeletal React component hierachies and state management. 
It provided me a solid foundation as a first-time React user! Additionally, I enhanced user engagement by incorporating a Leaflet API-powered interactive map for efficient delivery logistics. 
Our innovative work was recognized with the Best Agricultural Innovation Award at HACKUIOWA 2023.
        `,
        link: "https://github.com/nicosalm/cornucopia"
    },
    {
        name: "Paper++: Redesigning Academia and Paper-based Code Examinations",
        image: "/projects/paperplusplus.png",
        description: `
        For Paper++, I utilized the Google Cloud Vision API to transform handwritten code from images into compilable and executable programs, 
        addressing a niche need in academic and professional settings. 
        This system supports user programs with static dependencies, offering a seamless transition from paper to a digital platform of a remote code execution system. 
        The project aims to streamline the grading process for paper-based code assessments and interviews.
        I developed a Java backend to manage the automatic, thread-synced compilation and execution 
        of these programs, integrating the outputs into a React-based UI. 
        This project introduced me to leetcode's architecture with how I could improve Paper++ to become scalable. I hope to revisit this project and implement
        a stateless architecture, using Docker compose for Boss-Worker nodes and load balancing.  
        Our efforts were recognized at MadHacks 2023, 
        where "Paper++" was ranked in the top 5 out of 58 projects, 
        validating the project's potential to modernize the evaluation of coding skills.
        `,
        link: "https://devpost.com/software/paper-pm7okl"
    },
    {
        name: "College Database: A Red-Black Tree approach to stable O(log n) data storage operations",
        image: "/projects/college.jpg",
        description: `
        This database utilizes Red-Black Trees for stable and efficient insertion, lookup, and deletion operations. It was aimed to
provide a streamlined and highly customizable platform for managing data on over 800 colleges.
In a team of 4, I developed a CSV parsing module to extract and filter college data according to specified priorities during
insertion.
I also enhanced the database with the ability to perform dynamic lookups based on various data fields, including but not limited to
rankings, student populations, and academic programs. 
This was an exploratory approach to simulate a schema-less pseudo NoSql Database, 
by using Java reflection to retrieve values and data types during runtime, 
and invoking its appropriate Comparable method. I also explored and implemented the O(log n) algorithm for deletion operations.
        `
    },
];
