import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Target } from 'lucide-react';

// --- Main About Us Component ---
export default function AboutUs() {
    // This effect hook handles loading the AOS library from a CDN
    useEffect(() => {
        // Create a <link> element for the AOS CSS
        const link = document.createElement('link');
        link.href = 'https://unpkg.com/aos@2.3.1/dist/aos.css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        // Create a <script> element for the AOS JavaScript
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/aos@2.3.1/dist/aos.js';
        script.async = true;

        // Initialize AOS after the script has loaded
        script.onload = () => {
            window.AOS.init({
                duration: 800, // Animation duration in milliseconds
                once: true,    // Whether animation should happen only once - while scrolling down
            });
        };

        document.body.appendChild(script);

        // Cleanup function to remove the script and link when the component unmounts
        return () => {
            document.head.removeChild(link);
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="bg-white min-h-screen font-sans text-gray-700">
            {/* --- Header/Navigation --- */}
            <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                    <Link to="/" className="text-2xl font-bold text-teal-600 tracking-tight">Globe Allied .</Link>
                    <div>
                        <Link to="/" className="text-gray-600 hover:text-teal-600 font-medium px-3 py-2 rounded-md transition-colors">Home</Link>
                        <Link to="/about-us" className="bg-teal-100 text-teal-700 font-medium px-3 py-2 rounded-md">About Us</Link>
                    </div>
                </nav>
            </header>

            <main>
                {/* --- Hero Section with Background Image --- */}
                <section 
                    className="relative text-white py-24 md:py-40 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url('https://media.istockphoto.com/id/2198864187/photo/group-of-people-outdoor-and-portrait-as-medical-student-for-career-learning-or-education-in.webp?a=1&b=1&s=612x612&w=0&k=20&c=Ek19PWjAZy-b0tpmjkL1y5hYVnOIO47ihmCfWwUBJ7E=')` }}
                >
                    <div className="absolute inset-0 bg-teal-800 opacity-70"></div>
                    <div className="relative max-w-4xl mx-auto text-center px-4">
                        <p className="font-semibold text-teal-200" data-aos="fade-up">OUR LITTLE PROJECT</p>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mt-2" data-aos="fade-up" data-aos-delay="100">
                            Connecting Education & Opportunity
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-teal-100 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                            We are dedicated to building a seamless ecosystem for students, colleges, and administrators to thrive through innovative technology.
                        </p>
                    </div>
                </section>

                {/* --- Our Mission & Vision Section --- */}
                <section className="py-20 sm:py-28">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" data-aos="fade-up">
                                Empowering the Next Generation
                            </h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500" data-aos="fade-up" data-aos-delay="100">
                                Our platform is designed with three core principles in mind.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                            <InfoCard 
                                icon={<Building className="h-8 w-8 text-white" />}
                                title="For Institutions"
                                description="Providing robust tools for administrators to manage student data efficiently, track progress, and foster a connected campus environment."
                                aos="fade-right"
                            />
                            <InfoCard 
                                icon={<Users className="h-8 w-8 text-white" />}
                                title="For Students"
                                description="Offering a centralized platform for students to access their academic records, manage their profile, and stay connected with their institution."
                                aos="fade-up"
                                delay="100"
                            />
                            <InfoCard 
                                icon={<Target className="h-8 w-8 text-white" />}
                                title="Our Vision"
                                description="To be the leading digital bridge in education, simplifying administrative complexities and enabling institutions to focus on student success."
                                aos="fade-left"
                            />
                        </div>
                    </div>
                </section>

                {/* --- Meet Our Team Section --- */}
                <section className="py-20 sm:py-28 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl" data-aos="fade-up">Meet the Innovators</h2>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500" data-aos="fade-up" data-aos-delay="100">
                                The passionate minds behind Globe Allied, dedicated to revolutionizing educational management.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                            <TeamMemberCard 
                                imgSrc="https://placehold.co/400x400/a0aec0/4a5568?text=JD"
                                name="Jane Doe"
                                title="Founder & CEO"
                                aos="zoom-in"
                            />
                            <TeamMemberCard 
                                imgSrc="https://placehold.co/400x400/a0aec0/4a5568?text=JS"
                                name="John Smith"
                                title="Chief Technology Officer"
                                aos="zoom-in"
                                delay="100"
                            />
                             <TeamMemberCard 
                                imgSrc="https://placehold.co/400x400/a0aec0/4a5568?text=EW"
                                name="Emily White"
                                title="Head of Product"
                                aos="zoom-in"
                                delay="200"
                            />
                             <TeamMemberCard 
                                imgSrc="https://placehold.co/400x400/a0aec0/4a5568?text=MB"
                                name="Michael Brown"
                                title="Lead UI/UX Designer"
                                aos="zoom-in"
                                delay="300"
                            />
                        </div>
                    </div>
                </section>
            </main>

            {/* --- Footer --- */}
            <footer className="bg-gray-800 text-white">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-base text-gray-400">&copy; {new Date().getFullYear()} Globe Allied. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}

// --- UI Sub-components ---
const InfoCard = ({ icon, title, description, aos, delay = "0" }) => (
    <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300" data-aos={aos} data-aos-delay={delay}>
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-teal-600 text-white shadow-md">
            {icon}
        </div>
        <h3 className="mt-6 text-xl font-bold text-gray-900">{title}</h3>
        <p className="mt-3 text-base text-gray-500">{description}</p>
    </div>
);

const TeamMemberCard = ({ imgSrc, name, title, aos, delay = "0" }) => (
    <div className="text-center" data-aos={aos} data-aos-delay={delay}>
        <div className="relative inline-block">
            <img className="mx-auto h-36 w-36 rounded-full object-cover" src={imgSrc} alt={name} />
        </div>
        <h3 className="mt-5 text-xl font-bold text-gray-900">{name}</h3>
        <p className="mt-1 text-teal-600 font-semibold">{title}</p>
    </div>
);

