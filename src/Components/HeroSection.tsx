import NavbarComponent from "./NavbarComponent";
import SearchForm from "./SearchForm";


const HeroSection = () => {
    
       return (
        <div className="flex-col w-full">
            <NavbarComponent />
            <div className="pink-container">

                    <h1 className="heading">Discover your potential <br /> Start your journey today.</h1>
                    <SearchForm />
                    <p className="heading_paragraph">Discover endless opportunities with us—where your skills meet the perfect job. Start your journey today and take the next step toward a brighter future.</p>
            </div>
        </div>
    );
};

export default HeroSection;
