import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from "next/link";
import Image from "next/image";

const Header = () => {
    const categoryendpoint = `/wp-json/unation-aws-api/get-category-tree-data`;
    const cityendpoint = `/wp-json/unation-aws-api/get-curated-cities-data`;

    const [categoriesData, setCategoriesData] = useState(null);
    const [cityData, setCityData] = useState(null);
    const [filteredCities, setFilteredCities] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [menuVisible, setMenuVisible] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [userLogin, setUserLogin] = useState('no');

    // Fetch categories and city data
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(categoryendpoint);
                setCategoriesData(response.data.result.data.categories);
                console.log("categoriesData", categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        const fetchCities = async () => {
            try {
                const response = await axios.get(cityendpoint);
                setCityData(response.data.result.data.curated_cities);
                setFilteredCities(response.data.result.data.curated_cities);
                console.log("cityData", cityData);
            } catch (error) {
                console.error('Error fetching cities:', error);
            }
        };

        fetchCategories();
        fetchCities();
    }, []);

    // Fetch user status
    useEffect(() => {
        const fetchUserStatus = async () => {
            try {
                const formData = new FormData();
                formData.append('action', 'unaws_get_user_status_data');

                const response = await axios.post('https://test.unationstaging.com/wp-admin/admin-ajax.php', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                if (response.data.success && response.data.data.rstatus === 1) {
                    setUserLogin('yes');
                    setAvatarUrl(response.data.data.user_data.avatar);
                    console.log(response.data.data.user_data.avatar);
                } else {
                    setUserLogin('no');
                }
            } catch (error) {
                setUserLogin('no');
                console.error('Error fetching user status:', error);
            }
        };

        fetchUserStatus();
    }, []);

    const handleTogglePopup = () => {
        if(menuVisible == 0){
            setMenuVisible("1");
        }else{
            setMenuVisible("0");
        }
        console.log(menuVisible);
    };

    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        setSearchTerm(searchValue);

        // Filter cities based on search
        const filtered = cityData.filter(
            (city) =>
                city.city_name.toLowerCase().includes(searchValue) ||
                city.state_code.toLowerCase().includes(searchValue)
        );

        setFilteredCities(filtered);
        console.log("citiy", filteredCities);
    };

    const formatCityName = (name) => {
        return name
            .toLowerCase() // Ensure lowercase for uniformity
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
    };


    const handleMouseEnter = (event) => {

        document
            .querySelectorAll(".category-dropdown .cstmcatefry_icon > ul > li")
            .forEach((el) => {
                el.classList.remove("active");
            });

        event.currentTarget.classList.add("active");
    };

    const handleSubCatFunction = () => {
        jQuery('.sub-arrow').on('click',function(event){	
            event.preventDefault();
            jQuery(this).closest('a').next('.children_box').addClass('show-menu');
        });
        jQuery('.menu-title').on('click',function(event){	
            event.preventDefault();
            jQuery(this).closest('.children_box').removeClass('show-menu');
        });
    };
    return (
        <header className="aws-unation-header">
            <div className="header-in fw flex">
                <div className="logo-with-search flex">
                    <Link href="https://www.unation.com" className="logo">
                        <Image
                            src="https://assets.unation.com/wp-content/uploads/2021/09/UNATION_logo.svg"
                            alt="UNATION_logo"
                            title="UNATION_logo"
                            width={115}
                            height={24}
                            loading="lazy"
                        />
                    </Link>
                </div>

                <div className="header-right flex">
                    <div className="header-right-in flex">
                        <div className="category-dropdown">
                            <ul className="menu">
                                <li className="cstmcatefry_icon menu-item">
                                    <Link href="#">
                                        Categories
                                    </Link>
                                    <ul className="sub-menu">
                                        {Array.isArray(categoriesData) && categoriesData.length > 0 && categoriesData.map((category) => (
                                             Array.isArray(category.children) && category.children.length > 0 && (
                                            <li className={`cat-item cat-item-8789 cat-item-${category.slug}`} key={category.id} onMouseEnter={handleMouseEnter}>
                                                <Link className="has-submenu" data-title={category.name} href={`https://www.unation.com/unation-categories/${category.slug}/`}>

                                                    {category.name}
                                                    <span className="sub-arrow">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                                            <path d="M1.86 0.61C1.67 0.42 1.43 0.32 1.16 0.32C0.6 0.32 0.16 0.76 0.16 1.32C0.16 1.6 0.27 1.85 0.46 2.04L6.37 7.81L0.46 13.57C0.27 13.76 0.16 14.02 0.16 14.29C0.16 14.85 0.6 15.29 1.16 15.29C1.43 15.29 1.67 15.19 1.86 15L8.42 8.59C8.66 8.37 8.77 8.1 8.77 7.81C8.77 7.51 8.66 7.26 8.43 7.03L1.86 0.61Z" fill="#78818B"></path>
                                                        </svg>
                                                    </span>

                                                </Link>
                                                <div className="children_box">
                                                    <div className="children-in">
                                                        <div className="see-all-btn-wrap">
                                                            <Link className="see-all-btn" href={`https://www.unation.com/unation-categories/${category.slug}/`}>
                                                                See All
                                                            </Link>
                                                        </div>
                                                        <h6 className="menu-title">
                                                            <span>
                                                                <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M14.82 5.5H1" stroke="#1E1F22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                    <path d="M5.5 10L1 5.5L5.5 1" stroke="#1E1F22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                </svg>
                                                            </span>
                                                            {category.name}
                                                        </h6>
                                                        <ul className="children">
                                                            {category.children && category.children.length > 0 &&
                                                                category.children.map((child) => (
                                                                    Array.isArray(child.children) && child.children.length > 0 ? (
                                                                    <li onMouseEnter={handleSubCatFunction}
                                                                     className={`cat-item cat-item-8795 cat-item-${child.slug}`} key={child.id}>
                                                                        <Link className="has-submenu" data-title={child.name} data-href={`https://www.unation.com/unation-categories/${category.slug}/${child.slug}`} href="#">
                                                                            {child.name}
                                                                            <span className="sub-arrow asd"
                                                                            >
                                                                                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="16" viewBox="0 0 9 16" fill="none">
                                                                                    <path d="M1.86 0.61C1.67 0.42 1.43 0.32 1.16 0.32C0.6 0.32 0.16 0.76 0.16 1.32C0.16 1.6 0.27 1.85 0.46 2.04L6.37 7.81L0.46 13.57C0.27 13.76 0.16 14.02 0.16 14.29C0.16 14.85 0.6 15.29 1.16 15.29C1.43 15.29 1.67 15.19 1.86 15L8.42 8.59C8.66 8.37 8.77 8.1 8.77 7.81C8.77 7.51 8.66 7.26 8.43 7.03L1.86 0.61Z" fill="#78818B"></path>
                                                                                </svg>
                                                                            </span>
                                                                        </Link>
                                                                        <div className="children_box">
                                                                            <div className="children-in">
                                                                                <div className="see-all-btn-wrap">
                                                                                    <Link className="see-all-btn" href={`https://www.unation.com/unation-categories/music/concerts/`}>
                                                                                        See All
                                                                                    </Link>
                                                                                </div>
                                                                                <h6 className="menu-title" >
                                                                                    <span>
                                                                                        <svg width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M14.8213 5.5L0.999862 5.5" stroke="#1E1F22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                            <path d="M5.5 10L1 5.5L5.5 1" stroke="#1E1F22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                                        </svg>
                                                                                    </span>
                                                                                    {child.name}
                                                                                </h6>
                                                                                <ul className="children">
                                                                                    {child.children && child.children.length > 0 &&
                                                                                        child.children.map((subchild) => (
                                                                                            <li className="cat-item cat-item-9391 cat-item-rock" key={subchild.id}>
                                                                                                <Link href={`https://www.unation.com/unation-categories/${category.slug}/${child.slug}/${subchild.slug}`}>
                                                                                                    {subchild.name}
                                                                                                </Link>
                                                                                            </li>
                                                                                        ))}
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                    ) : (
                                                                        <li className={`cat-item cat-item-8795 cat-item-${child.slug}`} key={child.id}>
                                                                        <Link className="has-submenu" data-title={child.name} href={`https://www.unation.com/unation-categories/${category.slug}/${child.slug}`}>
                                                                            {child.name}
                                                                        </Link>
                                                                    </li>
                                                                    )
                                                                ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </li>
                                            ) 
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                        </div>

                        <div className="location-dropdown">
                            <div className="city_drop-down">
                                <span className="city_cstm">
                                    Select City <i className="fa fa-caret-down"></i>
                                </span>
                                <div className="drop-down-data">
                                    <div className="search_city">
                                        <form name="search_city">
                                            <span className="input-group-text-img" id="inputGroupPrepend">
                                                <Image
                                                    src="https://assets.unation.com/wp-content/uploads/2021/11/search-city-icon.svg"
                                                    alt="search city"
                                                    width={115}
                                                    height={24}
                                                />
                                            </span>
                                            <input
                                                type="text"
                                                id="cstm_search"
                                                name="cstm_search"
                                                placeholder="Enter City"
                                                value={searchTerm}
                                                onChange={handleSearch}
                                            />
                                        </form>
                                    </div>

                                    <div className="cstm_loader">
                                        <img
                                            src="https://assets.unation.com/wp-content/uploads/2021/12/dots-cropped.svg"
                                            alt="loading"
                                        />
                                    </div>

                                    <div className="city_search_list hhhhhhh"></div>

                                    <div className="inner_city">
                                        <input type="hidden" id="hidden_city_state" value="" />
                                        <h2>Curated metros</h2>

                                        {filteredCities.length > 0 ? (
                                            filteredCities.map((city, index) => (
                                                <Link
                                                    key={`${city.id}-${index}`}
                                                    href={city.url}
                                                    className={`city-link link-${city.city_name
                                                        .toLowerCase()
                                                        .replace(/\s+/g, '-')}`}
                                                >
                                                    {`${formatCityName(city.city_name)}, ${city.state_code.toUpperCase()}`}
                                                </Link>
                                            ))
                                        ) : (
                                            <p>No cities found</p>
                                        )}
                                    </div>

                                </div>
                            </div>
                        </div>

                        {userLogin == 'yes' && (
                            <div className="dashboard-dropdown">
                                <div className="cstms_top_bar1">
                                    <span className="cstm_prof" onClick={handleTogglePopup}>
                                        <span>
                                            <img
                                                src={avatarUrl != '' ? avatarUrl : "https://secure.gravatar.com/avatar/19f157fcbf8e9276ef2185005b7251d7?s=96&d=mm&r=g"}
                                                alt="Profile"
                                                loading='lazy'
                                            />
                                        </span>
                                        <span className="userName">My Dashboard</span>
                                        <span className="myclick"></span>
                                    </span>
                                    <div
                                        className="inner_menu"
                                        style={{ display: menuVisible === "1" ? "block" : "none" }}
                                    >
                                        <Link href="https://test.unationstaging.com/wp-admin/">
                                            Dashboard
                                        </Link>
                                        <Link href="#">
                                            Logout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                         )} 

                        <div className="hamburger">
                            <div
                                role="button"
                                tabIndex="0"
                                aria-haspopup="true"
                                className="sfm-navicon-button x sf_label_custom la_icon_manager_custom_wrapper"
                            >
                                <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M18 14.9577C18 15.5343 17.5319 16.0013 16.9553 16L9.90093 15.9841C9.33059 15.9828 8.86891 15.5201 8.86892 14.9497C8.86892 14.3785 9.33201 13.9154 9.90326 13.9154L16.9577 13.9154C17.5333 13.9154 18 14.382 18 14.9577ZM18 1.0448C18 1.62111 17.5328 2.08829 16.9565 2.08829L6.48826 2.08829C5.91195 2.08829 5.44476 1.6211 5.44476 1.04479C5.44476 0.468476 5.91195 0.00128252 6.48827 0.00128348L16.9565 0.00130843C17.5328 0.00131034 18 0.468497 18 1.0448ZM16.9565 9.04533C17.5328 9.04533 18 8.57814 18 8.00184C18 7.42554 17.5328 6.95836 16.9565 6.95836L9.1371 6.95836L1.31768 6.95836C0.741378 6.95836 0.274195 7.42554 0.274195 8.00184C0.274195 8.57814 0.741375 9.04533 1.31767 9.04533L16.9565 9.04533Z"
                                        fill="#1E1F22"
                                    ></path>
                                </svg>
                            </div>
                        </div>

                        <div className="category-dropdown-sidebar">
                            <div className="sidebar-nav-head-bg"></div>
                            <nav className="sidebar-nav">
                                <div className="sidebar-nav-in">
                                    <div className="sidebar-nav-header">
                                        <div className="sidebar-logo-wrap">
                                            <Link href="https://www.unation.com" className="sidebar-logo">
                                                <svg width="115"
                                                    height="24" viewBox="0 0 115 24" fill="none"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0 16.4678V6.42188H4.71084V16.4678C4.71084 17.4111 5.04015 18.1416 5.69877 18.6594C6.38138 19.1856 7.21972 19.4595 8.07573 19.4361C8.9322 19.4598 9.77106 19.1859 10.454 18.6594C11.1118 18.1426 11.4406 17.412 11.4406 16.4678V6.42188H16.1515V16.4678C16.1515 18.8421 15.3587 20.6912 13.7732 22.0154C12.1876 23.3395 10.2885 24.0015 8.07573 24.0015C5.86118 24.0015 3.96204 23.3395 2.3783 22.0154C0.794562 20.6912 0.00179461 18.8421 0 16.4678Z"
                                                        fill="url(#paint0_linear_1687_1433)"></path>
                                                    <path d="M18.2266 13.3619C18.2266 10.9876 19.0193 9.13841 20.6049 7.81429C22.1904 6.49018 24.09 5.82812 26.3036 5.82812C28.5164 5.82812 30.4155 6.49018 32.0011 7.81429C33.5866 9.13841 34.3794 10.9876 34.3794 13.3619V23.4078H29.6685V13.3619C29.6685 12.4195 29.3468 11.6889 28.7035 11.1702C28.0601 10.6515 27.2602 10.3927 26.3036 10.3936C25.4554 10.378 24.6263 10.6513 23.9482 11.1702C23.2734 11.688 22.937 12.4186 22.9387 13.3619V23.4078H18.2279L18.2266 13.3619Z"
                                                        fill="url(#paint1_linear_1687_1433)"></path>
                                                    <path d="M49.8604 5.91851H54.4811V23.5886H49.8604V22.8585C48.5486 23.6184 47.0628 24.012 45.5534 23.9995C44.3224 24.0113 43.1016 23.7709 41.9637 23.2927C40.8556 22.8197 39.659 21.8837 38.3741 20.4847C37.0891 19.0857 36.4462 17.1981 36.4453 14.822C36.4453 12.4478 37.0734 10.568 38.3296 9.18268C39.5859 7.79738 40.812 6.86137 42.0081 6.37464C43.1624 5.8966 44.3961 5.64874 45.6422 5.64456C46.4105 5.64269 47.1752 5.75011 47.9142 5.96371C48.6017 6.15753 49.2588 6.44945 49.8658 6.83078L49.8604 5.91851ZM42.1885 17.9725C43.0553 18.8857 44.1469 19.3423 45.4632 19.3423C46.8092 19.3423 47.8783 18.9085 48.6706 18.041C49.4606 17.1826 49.8878 16.043 49.8604 14.8672C49.8876 13.692 49.4604 12.5528 48.6706 11.6948C47.8783 10.8264 46.8092 10.3922 45.4632 10.3922C44.1469 10.3922 43.0773 10.8415 42.2545 11.74C41.4564 12.5775 41.0136 13.7006 41.0216 14.8672C41.0062 16.0161 41.4238 17.1273 42.1885 17.9725Z"
                                                        fill="url(#paint2_linear_1687_1433)"></path>
                                                    <path d="M65.3492 0L65.3936 5.82701H69.6105V10.6212L65.3936 10.6664V23.4053H60.7258L60.6827 10.6664H56.5547V5.87221L60.6827 5.82701V0H65.3492Z"
                                                        fill="url(#paint3_linear_1687_1433)"></path>
                                                    <path d="M80.9305 8.52284C82.6946 6.63529 84.893 5.69152 87.5257 5.69152C88.758 5.68546 89.9796 5.92608 91.1207 6.39969C92.2409 6.86096 93.2507 7.56164 94.0818 8.45435C94.9002 9.32161 95.5408 10.346 95.9662 11.4678C96.3772 12.5375 96.5903 13.6753 96.5947 14.8238C96.5947 17.2592 95.9738 19.1541 94.7319 20.5083C93.49 21.8626 92.3011 22.7758 91.1651 23.2479C90.011 23.7237 88.7763 23.9643 87.5311 23.9561C84.8688 23.9561 82.6928 23.0278 81.0032 21.1713C79.3136 19.3148 78.4687 17.199 78.4688 14.8238C78.4688 12.4504 79.2893 10.3501 80.9305 8.52284ZM84.2052 18.0126C85.0738 18.9313 86.1658 19.3906 87.4813 19.3906C88.8272 19.3906 89.8963 18.9546 90.6887 18.0825C91.479 17.2177 91.9059 16.0729 91.8785 14.8923C91.9063 13.712 91.4793 12.5675 90.6887 11.7034C89.8999 10.8314 88.8326 10.3949 87.4866 10.3939C86.1703 10.3939 85.1007 10.8455 84.2779 11.7486C83.4788 12.5922 83.0363 13.7207 83.045 14.8923C83.0277 16.0447 83.4426 17.1605 84.2052 18.0126Z"
                                                        fill="url(#paint4_linear_1687_1433)"></path>
                                                    <path d="M98.6562 13.3619C98.6562 10.9876 99.449 9.13841 101.035 7.81429C102.62 6.49018 104.519 5.82813 106.732 5.82812C108.945 5.82812 110.844 6.49018 112.429 7.81429C114.015 9.13841 114.808 10.9876 114.808 13.3619V23.4078H110.097V13.3619C110.097 12.4195 109.775 11.6889 109.132 11.1702C108.488 10.6515 107.689 10.3927 106.732 10.3936C105.884 10.378 105.055 10.6513 104.377 11.1702C103.704 11.688 103.367 12.4186 103.367 13.3619V23.4078H98.6562V13.3619Z"
                                                        fill="url(#paint5_linear_1687_1433)"></path>
                                                    <path d="M76.3984 5.87109H71.6875V10.6653H76.3984V5.87109Z"
                                                        fill="url(#paint6_linear_1687_1433)"></path>
                                                    <path d="M76.3984 12.2422H71.6875V23.4072H76.3984V12.2422Z"
                                                        fill="url(#paint7_linear_1687_1433)"></path>
                                                    <defs>
                                                        <linearGradient id="paint0_linear_1687_1433" x1="0"
                                                            y1="12.0023" x2="114.813" y2="12.0023"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint1_linear_1687_1433" x1="0.00368221"
                                                            y1="12.0017" x2="114.816" y2="12.0017"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint2_linear_1687_1433"
                                                            x1="-0.00180125" y1="12.0003" x2="114.811" y2="12.0003"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint3_linear_1687_1433"
                                                            x1="0.000317991" y1="12.0006" x2="114.813" y2="12.0006"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint4_linear_1687_1433"
                                                            x1="-0.000364808" y1="12.0021" x2="114.812"
                                                            y2="12.0021" gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint5_linear_1687_1433" x1="-0.002342"
                                                            y1="12.0017" x2="114.81" y2="12.0017"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint6_linear_1687_1433" x1="0.00569111"
                                                            y1="11.9995" x2="114.819" y2="11.9995"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                        <linearGradient id="paint7_linear_1687_1433" x1="0.00569111"
                                                            y1="12.0011" x2="114.819" y2="12.0011"
                                                            gradientUnits="userSpaceOnUse">
                                                            <stop stopColor="#F5286E"></stop>
                                                            <stop offset="0.66" stopColor="#FA5950"></stop>
                                                            <stop offset="1" stopColor="#FC6D43"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                </svg>
                                            </Link>
                                        </div>
                                        <span className="sidebar-close-btn"></span>
                                    </div>

                                    <div className="sidebar-nav-content">
                                        <div className="category-dropdown-sidebar-in">
                                            <ul className="menu">
                                                <li
                                                    id="menu-item-109119"
                                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-109119 has-submenu"
                                                >
                                                    <Link href="#" data-title="About">
                                                        About
                                                        <span className="sidemenu-sub-arrow">
                                                            <svg
                                                                width="6"
                                                                height="11"
                                                                viewBox="0 0 6 11"
                                                                fill="none"
                                                                xmlns="http://www.w3.org/2000/svg"
                                                            >
                                                                <path
                                                                    d="M0.934868 1.50195L5 5.50195L0.934868 9.50195"
                                                                    stroke="#1E1F22"
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                ></path>
                                                            </svg>
                                                        </span>
                                                    </Link>
                                                    <div className="sub-menu-wrap">
                                                        <div className="sidebar-nav-in">
                                                            <div className="sidebar-nav-header">
                                                                <div className="main-menu-back-btn">
                                                                    <span>
                                                                        <Image src="https://assets.unation.com/wp-content/themes/hello-theme-child-master/aws/img/back-left-dark.svg" alt=""
                                                                            title="UNATION_logo"
                                                                            width={115}
                                                                            height={24}
                                                                            loading="lazy" />
                                                                        <span id="main-heading">
                                                                            <em className="main-menu">Main Menu</em>
                                                                            <em className="back-heading"></em>
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                                <span className="sidebar-close-btn"></span>
                                                            </div>
                                                            <div className="sidebar-nav-content">
                                                                <div className="menu-title">About</div>
                                                                <ul className="sub-menu">
                                                                    <li id="menu-item-109120" className="menu-item">
                                                                        <Link href="/about-us/">
                                                                            About Us
                                                                        </Link>
                                                                    </li>
                                                                    <li id="menu-item-109124" className="menu-item">
                                                                        <Link href="/careers/">
                                                                            Careers
                                                                        </Link>
                                                                    </li>
                                                                    <li id="menu-item-673094" className="menu-item">
                                                                        <Link href="https://www.unation.com/press-page/">
                                                                            Press
                                                                        </Link>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                                <li id="menu-item-109118" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-109118 has-submenu parent-menu-open">
      <Link href="#" data-title="City Partners">
        City Partners
        <span className="sidemenu-sub-arrow">
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.934868 1.50195L5 5.50195L0.934868 9.50195" stroke="#1E1F22" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
      </Link>
      <div className="sub-menu-wrap">
        <div className="sidebar-nav-in">
          <div className="sidebar-nav-header">
            <div className="main-menu-back-btn">
              <span>
                <img src="https://qa.unation.com/wp-content/themes/hello-theme-child-master/aws/img/back-left-dark.svg" alt="Back" />
                <span id="main-heading">
                  <em className="main-menu">Main Menu</em>
                  <em className="back-heading"></em>
                </span>
              </span>
            </div>
            <span className="sidebar-close-btn"></span>
          </div>
          <div className="sidebar-nav-content">
            <div className="menu-title">City Partners</div>
            <ul className="sub-menu">
              <li id="menu-item-673093" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-673093">
                <Link href="/city-partner/">
                  Become a City Partner
                </Link>
              </li>
              <li id="menu-item-673092" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-673092">
                <Link href="https://www.unation.com/ugc-program/">Become a Content Creator</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </li>
                                                <li id="menu-item-333292" className="menu-item">
                                                    <Link href="https://www.unation.com/promote-with-us/">
                                                        Promote With Us
                                                    </Link>
                                                </li>
                                                

                                                {userLogin === 'yes' ? (
                                                    <>
                                                        <li className="custm-menu logout_btns">
                                                            <Link href="#">
                                                                Logout
                                                            </Link>
                                                        </li>
                                                    </>
                                                ) : (
                                                    <>
                                                        <li className="custm-menu sign_btns">
                                                            <Link href="https://test.unationstaging.com/wp-login">
                                                                <span>Sign In</span>
                                                            </Link>
                                                        </li>
                                                        <li className="or-divider">
                                                            <span>or</span>
                                                        </li>
                                                        <li className="custm-menu join_btns">
                                                            <Link href="https://test.unationstaging.com/wp-login">
                                                                Join
                                                            </Link>
                                                        </li>
                                                    </>
                                                )}
                                            </ul>
                                        </div>

                                        <div className="sidebar-footer-menu">
                                            <h6>© UNATION, INC. 2024 • v5.2.1</h6>
                                            <ul id="menu-privacy-menu" className="menu">
                                                <li id="menu-item-533840" className="menu-item">
                                                    <Link href="https://www.unation.com/terms/">
                                                        Terms
                                                    </Link>
                                                </li>
                                                <li id="menu-item-533839" className="menu-item">
                                                    <Link href="https://www.unation.com/privacy/">
                                                        Privacy
                                                    </Link>
                                                </li>
                                                <li id="menu-item-533841" className="menu-item">
                                                    <Link href="https://www.unation.com/faqs/">
                                                        FAQs
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>



                    </div>
                </div>

            </div>
        </header>
    );
};

export default Header;
