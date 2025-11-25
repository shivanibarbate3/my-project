-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 05, 2024 at 02:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `testnode`
--

-- --------------------------------------------------------

--
-- Table structure for table `aboutbanner`
--

CREATE TABLE `aboutbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutbanner`
--

INSERT INTO `aboutbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_about-us-banner.jpg', '78512555_about-us.jpg', 'About Us', 'Delivering client-centric solutions for 12 years', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aboutbanner_new`
--

CREATE TABLE `aboutbanner_new` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutbanner_new`
--

INSERT INTO `aboutbanner_new` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_about-us-banner.jpg', '78512555_about-us.jpg', 'About Us', 'Delivering client-centric solutions for 12 years', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aboutpagedetails`
--

CREATE TABLE `aboutpagedetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutpagedetails`
--

INSERT INTO `aboutpagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Integrating Solutions to Drive Your Mission Forward', '789525252_our-expert_img.png', 'By connecting institutions through technology, we ensure your success story remains unique, just like your initiatives. Our team collaborates with you to provide tools that simplify your processes and enhance your operational efficiency.', 'We unify systems and processes to simplify management, ensuring you stay ahead and enhancing equitable collaboration among all.', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aboutpagedetails_new`
--

CREATE TABLE `aboutpagedetails_new` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `page_des_new` text NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_second` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutpagedetails_new`
--

INSERT INTO `aboutpagedetails_new` (`id`, `page_title`, `page_des`, `page_des_new`, `image`, `image_second`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'We engineer the future of our K-12 operations with solutions designed for today. ', 'Our journey has continuously evolved over 12 years, driven by a simple yet profound mission crafted with precision and purpose, fueling your success in the digital realm.', 'By connecting institutions through technology, we ensure your success story remains unique, just like your initiatives.\r\nOur team collaborates with you to provide tools that simplify your processes and enhance your operational efficiency.', '1729583609330INFOGRAPHICS-FINAL-NEW.png', '1729583613591second-version-about-infographics_final_01.png', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `aboutteamdetails`
--

CREATE TABLE `aboutteamdetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `aboutteamdetails`
--

INSERT INTO `aboutteamdetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Integrating Solutions to Drive Your Mission Forward', '789525252_our-expert_img.png', 'By connecting institutions through technology, we ensure your success story remains unique, just like your initiatives. Our team collaborates with you to provide tools that simplify your processes and enhance your operational efficiency.', 'We unify systems and processes to simplify management, ensuring you stay ahead and enhancing equitable collaboration among all.', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `application`
--

CREATE TABLE `application` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `career_id` int(11) DEFAULT NULL,
  `upload_cv` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mob_image` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `blog_category` int(255) DEFAULT NULL,
  `date_pub` date DEFAULT NULL,
  `recent_post` enum('active','inactive') DEFAULT NULL,
  `popular_post` enum('active','inactive') DEFAULT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `sub_heading` varchar(255) DEFAULT NULL,
  `short_des_details` text DEFAULT NULL,
  `blog_de` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `title`, `slug`, `short_des`, `banner_image`, `banner_mob_image`, `image`, `blog_category`, `date_pub`, `recent_post`, `popular_post`, `heading`, `sub_heading`, `short_des_details`, `blog_de`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'testing blog', 'testing-blog', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.', '1730720601862inventory_img.png', '1730720604507athletic_img.png', '1730712738646chat-img-sec.png', 2, '2024-11-17', 'active', '', 'Blog', 'Blog fff', 'Blog fffgggdddd', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Increased participation of relevant employees.</li>\r\n<li>Reduced irrelevant training sessions.</li>\r\n<li>Improved communication and reduced administrative workload.</li>\r\n<li>Enhanced training program efficiency and participant satisfaction.</li>\r\n</ul>', '2024-11-04 09:32:21', '2024-11-04 09:32:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogbanner`
--

CREATE TABLE `blogbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogbanner`
--

INSERT INTO `blogbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_about-us-banner.jpg', '78512555_about-us.jpg', 'Our Blog', 'Delivering client-centric solutions for 12 years', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogcategory`
--

CREATE TABLE `blogcategory` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogcategory`
--

INSERT INTO `blogcategory` (`id`, `title`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Responsive Design', '2024-08-16 05:44:13', '2024-08-16 05:44:13', NULL),
(2, 'Desgn', '2024-11-04 07:15:11', '2024-11-04 07:15:11', NULL),
(3, 'Hiring', '2024-11-04 07:17:09', '2024-11-04 07:17:09', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogpageseotag`
--

CREATE TABLE `blogpageseotag` (
  `id` int(11) NOT NULL,
  `page_name` varchar(255) DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_key` text DEFAULT NULL,
  `meta_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogpageseotag`
--

INSERT INTO `blogpageseotag` (`id`, `page_name`, `meta_title`, `meta_key`, `meta_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1', 'dvfd', 'acdszfvdvcsz', 'dsvfxcv ', '2024-11-05 13:02:24', '2024-11-05 13:02:24', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `blogtitles`
--

CREATE TABLE `blogtitles` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blogtitles`
--

INSERT INTO `blogtitles` (`id`, `page_title`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', '2024-08-16 05:44:13', '2024-08-16 05:44:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `careerbanner`
--

CREATE TABLE `careerbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careerbanner`
--

INSERT INTO `careerbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_career-banner.jpg', '8855252_career.jpg', 'Current openings', 'Discover Careers That Fit Your Profile!', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `careerbanner_new`
--

CREATE TABLE `careerbanner_new` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careerbanner_new`
--

INSERT INTO `careerbanner_new` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_career-banner.jpg', '8855252_career.jpg', 'Current openings', 'Discover Careers That Fit Your Profile!', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `careerdetails_new`
--

CREATE TABLE `careerdetails_new` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careerdetails_new`
--

INSERT INTO `careerdetails_new` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Want To Give Your Career A Kick-start? Find Out About The Exciting Opportunities That Match Your Profile and Interest', NULL, NULL, NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `careerpagedetails`
--

CREATE TABLE `careerpagedetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careerpagedetails`
--

INSERT INTO `careerpagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Want To Give Your Career A Kick-start? Find Out About The \r\n                    Exciting Opportunities That Match Your Profile and Interest', NULL, NULL, NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `careers`
--

CREATE TABLE `careers` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `des` text DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careers`
--

INSERT INTO `careers` (`id`, `title`, `location`, `position`, `short_des`, `des`, `email`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Business Growth Consultant', 'New Jersey', 2, 'Ideal candidate should be a marketing wizard having 15 - 20 years of working experience having sold IT solutions in the education domain. Should have a proven record of scaling small businesses into large enterprises. A good strategist and a great executioner. Is able to understand market gaps and position businesses accordingly. Good contacts in the education sector is a must, especially in New Jersey', '<p>Seeking an opportunity to break through and prove to the world his or her worth.</p>\r\n<p>Understands the software solutions market at the back of his/her hand. A smart and intelligent worker. A business traveller at heart. Has the ability to strike rapport easily with people, is honest and yearns for the best things in life. Has good connections with CIO\'s & Technology heads in the K-12 domain, can influence them to win large contracts.</p>\r\n<h3>Desired Candidate Profile</h3>\r\n<div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Should be in a similar role with a CMMI Level 3 organisation.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Having good clarity over technical specification of software products.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Experience in customer acquisition for software services in the education domain \r\n            Entrepreneur at heart.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Preferably a Engineering graduate with a Management Degree from a leading institution\r\n            A go getter and an achiever.\r\n            </span></li>\r\n       \r\n     </ul>\r\n   \r\n </div>\r\n <h3>What we Offer</h3>\r\n <div class=\'roles-desc-sec anpara\'>\r\n\r\n <p>Remuneration starting at 7 digits and an opportunity to reach for the sky.</p>\r\n    <p>If you have a strong desire to change your current lifestyle and be recognised for having built a large business from the ground up, we are your best bet. We are here to change how our customers work today and will work tomorrow and you can create this story. If you have dreamt of building a large business, this is your chance to do it. The successful candidate will have the vote of trust from the leadership team, will be given a clear advantage to lay down the growth plans and be the torch bearer for the next growth phase of the business.\r\n    </p>\r\n\r\n </div>\r\n', 'career@appostrophi.com', '2024-08-16 07:00:37', '2024-08-16 07:00:37', NULL),
(2, 'Customer Acquisition Expert', 'New Jersey', 2, 'We are looking for a flexible, fast learning, technically strong data engineer. Expertise is required in the following fields:', '<h3>ROLES AND RESPONSIBILITIES</h3>\r\n<div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Lead a team of data scientists to design, develop, and deploy Al solutions using Python, SQL, Tableau, and other tools </span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Collaborate with stakeholders to understand business requirements and translate them into actionable insights through data \r\n         analysis and visualization.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Develop predictive models using machine learning algorithms and deep learning techniques to drive business outcomes.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Ensure high-quality deliverables by reviewing code reviews, providing feedback on project progress, and identifying areas for \r\n         improvement.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Stay up-to-date with industry trends in artificial intelligence, dato science, and related fields.\r\n         </span></li>\r\n     </ul>\r\n   \r\n </div>\r\n <div class=\'job-sec\'>\r\n <h3>JOB REQUIREMENTS</h3>\r\n <div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Strong proficiency in programming languages such as Python; knowledge of R is a plus.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Experience working with databases (SQL) and ability to write efficient queries.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Proficiency in data visualization tools like Tableau or similar technologies.</span></li>\r\n     \r\n     </ul>\r\n </div>\r\n </div>\r\n\r\n  <div class=\'job-sec\'>\r\n <h3>EXPERIENCE</h3>\r\n <div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Minimum of 5-7 years of experience in data science or related roles.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Proven track record of successful implementation of data science solutions in Azure, with a focus on Spark, Graph Data Connect, and Cognitive Search.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Previous experience in leading or mentoring junior data scientists.</span></li>\r\n     \r\n     </ul>\r\n </div>\r\n </div>\r\n <div class=\'job-sec\'>\r\n <h3>QUALIFICATIONS</h3>\r\n <div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Masters or Ph.D. in a relevant field such as Computer Science, Statistics, or Data Science.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Microsoft Azure certifications, especially those related to data and Al services.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Demonstrated ability to opply data science in real-world business scenarios, specifically with Spark, Graph Data Connect, and \r\n         Cognitive Search.</span></li>\r\n     \r\n     </ul>\r\n     \r\n </div>\r\n \r\n</div>', 'career@appostrophi.com', '2024-08-16 07:00:37', '2024-08-16 07:00:37', NULL),
(3, ' Social Media Strategist', 'New Jersey', 2, 'We are looking for a flexible, fast learning, technically strong data engineer. Expertise is required in the following fields:', '<h3>ROLES AND RESPONSIBILITIES</h3>\r\n<div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Lead a team of data scientists to design, develop, and deploy Al solutions using Python, SQL, Tableau, and other tools </span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Collaborate with stakeholders to understand business requirements and translate them into actionable insights through data \r\n         analysis and visualization.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Develop predictive models using machine learning algorithms and deep learning techniques to drive business outcomes.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Ensure high-quality deliverables by reviewing code reviews, providing feedback on project progress, and identifying areas for \r\n         improvement.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Stay up-to-date with industry trends in artificial intelligence, dato science, and related fields.\r\n         </span></li>\r\n     </ul>\r\n   \r\n </div>\r\n <div class=\'job-sec\'>\r\n <h3>JOB REQUIREMENTS</h3>\r\n <div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Strong proficiency in programming languages such as Python; knowledge of R is a plus.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Experience working with databases (SQL) and ability to write efficient queries.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Proficiency in data visualization tools like Tableau or similar technologies.</span></li>\r\n     \r\n     </ul>\r\n </div>\r\n </div>\r\n\r\n  <div class=\'job-sec\'>\r\n <h3>EXPERIENCE</h3>\r\n <div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Minimum of 5-7 years of experience in data science or related roles.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Proven track record of successful implementation of data science solutions in Azure, with a focus on Spark, Graph Data Connect, and Cognitive Search.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Previous experience in leading or mentoring junior data scientists.</span></li>\r\n     \r\n     </ul>\r\n </div>\r\n </div>\r\n <div class=\'job-sec\'>\r\n <h3>QUALIFICATIONS</h3>\r\n <div class=\'roles-desc-sec\'>\r\n     <ul>\r\n         <li><p class=\'img-sc\' ></p><span>Masters or Ph.D. in a relevant field such as Computer Science, Statistics, or Data Science.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Microsoft Azure certifications, especially those related to data and Al services.</span></li>\r\n         <li><p class=\'img-sc\' ></p><span>Demonstrated ability to opply data science in real-world business scenarios, specifically with Spark, Graph Data Connect, and \r\n         Cognitive Search.</span></li>\r\n     \r\n     </ul>\r\n     \r\n </div>\r\n \r\n</div>', 'career@appostrophi.com', '2024-08-16 07:00:37', '2024-08-16 07:00:37', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `careers_new`
--

CREATE TABLE `careers_new` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `no_vac` int(11) DEFAULT NULL,
  `date_join` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `det` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `careers_new`
--

INSERT INTO `careers_new` (`id`, `title`, `location`, `no_vac`, `date_join`, `date_end`, `det`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Business Growth Consultant', 'New Jersey', 2, '2024-11-03', '2024-11-28', '<p>career@appostrophi.<strong>dgfdbc</strong></p>', '2024-08-16 07:00:37', '2024-08-16 07:00:37', NULL),
(4, 'new new', 'ffgbgf', 5, '2024-11-04', '2024-11-30', '<p>svdxcbc</p><ol><li>dbcvb</li></ol>', '2024-11-05 10:42:38', '2024-11-05 10:42:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casestudiesbanner`
--

CREATE TABLE `casestudiesbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casestudiesbanner`
--

INSERT INTO `casestudiesbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_case-banner.jpg', '7851255h5_casestudy.jpg', 'Case Studies', 'The Measurable Yardsticks To Our Cause', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casestudiesbanner_new`
--

CREATE TABLE `casestudiesbanner_new` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casestudiesbanner_new`
--

INSERT INTO `casestudiesbanner_new` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_case-banner.jpg', '7851255h5_casestudy.jpg', 'Case Studies', 'The Measurable Yardsticks To Our Cause', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casestudiespagedetails`
--

CREATE TABLE `casestudiespagedetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casestudiespagedetails`
--

INSERT INTO `casestudiespagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Increasing Efficiency Efficiently', '78512555_njsmart_img-color.png', 'Our interventions at the largest public school district in New Jersey', NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casestudiespagedetails_new`
--

CREATE TABLE `casestudiespagedetails_new` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `casestudiespagedetails_new`
--

INSERT INTO `casestudiespagedetails_new` (`id`, `title`, `image`, `short_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Increasing Efficiency Efficiently', '78512555_njsmart_img-color.png', 'Our interventions at the largest public school district in New Jersey', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `connects`
--

CREATE TABLE `connects` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `casestudyname` varchar(255) DEFAULT NULL,
  `pagename` varchar(255) DEFAULT NULL,
  `contact_us` varchar(255) DEFAULT NULL,
  `sh_date` date DEFAULT NULL,
  `sh_time` varchar(200) DEFAULT NULL,
  `otp` varchar(100) DEFAULT NULL,
  `otp_sent_at` datetime DEFAULT NULL,
  `otp_attempt` tinyint(4) DEFAULT NULL,
  `status` enum('pending','approved') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `connects`
--

INSERT INTO `connects` (`id`, `name`, `email`, `phone`, `casestudyname`, `pagename`, `contact_us`, `sh_date`, `sh_time`, `otp`, `otp_sent_at`, `otp_attempt`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'archana', 'archana@ivdisplays.com', '9603659654', '', 'getintouch', 'You need more case studies', '0000-00-00', '', '8808', '2024-09-02 12:09:05', NULL, 'pending', '2024-09-02 12:09:04', '2024-09-02 12:09:04', NULL),
(2, 'archana', 'archana@ivdisplays.com', '9602356897', '', 'getintouch', 'You need more case studies', '0000-00-00', '', '1550', '2024-09-02 12:09:33', NULL, 'pending', '2024-09-02 12:09:33', '2024-09-02 12:09:33', NULL),
(3, 'archana', 'archana@ivdisplays.com', '962356478', '', 'getintouch', 'You want us to send you our company presentation', '0000-00-00', '', '6165', '2024-09-02 12:10:52', NULL, 'pending', '2024-09-02 12:10:51', '2024-09-02 12:10:51', NULL),
(4, 'archana', 'archana@ivdisplays.com', '960905654', '', 'getintouch', 'You need more case studies', '0000-00-00', '', '4445', '2024-09-03 04:56:51', NULL, 'pending', '2024-09-03 04:56:51', '2024-09-03 04:56:51', NULL),
(5, 'VINAY MENON', 'VINAY@IVDISPLAYS.COM', '9830400253', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '4469', '2024-09-03 10:04:16', NULL, 'pending', '2024-09-03 10:04:15', '2024-09-03 10:04:15', NULL),
(8, 'ankita', 'ankita@ivdisplays.com', '2014785800', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '5847', '2024-09-03 10:51:29', NULL, 'approved', '2024-09-03 10:51:29', '2024-09-03 10:51:29', NULL),
(9, 'VINAY MENON', 'VINAY@IVDISPLAYS.COM', '9830400253', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '8865', '2024-09-03 10:53:50', NULL, 'approved', '2024-09-03 10:53:50', '2024-09-03 10:53:50', NULL),
(10, 'Archana ', 'archana@ivdisplays.com', '9807654783', '', 'getintouch', 'You need more case studies', '0000-00-00', '', '1432', '2024-09-03 11:54:49', NULL, 'approved', '2024-09-03 11:54:48', '2024-09-03 11:54:48', NULL),
(11, 'archana', 'archana@ivdisplays.com', '', '', 'getintouch', 'You need more case studies', '0000-00-00', '', '5040', '2024-09-03 11:59:32', NULL, 'approved', '2024-09-03 11:59:32', '2024-09-03 11:59:32', NULL),
(12, 'Ankita Das', 'ankita@ivdisplays.com', '8583914291', 'OPRA Software', 'bookdemo', '', '2024-09-14', '6:30 PM', '1169', '2024-09-04 09:48:03', NULL, 'approved', '2024-09-04 09:48:02', '2024-09-04 09:48:02', NULL),
(13, 'Ankita das', 'ankita@ivdisplays.com', '', '', 'getintouch', 'you want us to send you our company presentation', '0000-00-00', '', '6271', '2024-09-04 11:35:59', NULL, 'approved', '2024-09-04 11:35:58', '2024-09-04 11:35:58', NULL),
(14, 'Ankita das', 'ankita@ivdisplays.com', '8583914291', '', 'leader', 'you want a representative to call you', '0000-00-00', '', '9101', '2024-09-04 11:39:05', NULL, 'approved', '2024-09-04 11:39:05', '2024-09-04 11:39:05', NULL),
(15, 'Ankita das', 'ankita@ivdisplays.com', '8583914291', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '1231', '2024-09-04 12:16:02', NULL, 'approved', '2024-09-04 12:16:01', '2024-09-04 12:16:01', NULL),
(16, 'ankita das', 'ankita@ivdisplays.com', '8583914291', 'E-form Approval and Routing System', 'bookdemo', '', '2024-09-13', '3:00 PM', '4513', '2024-09-05 05:31:53', NULL, 'approved', '2024-09-05 05:31:53', '2024-09-05 05:31:53', NULL),
(17, 'Ankita das', 'ankita@ivdisplays.com', '859155558', 'Workshop Management\r\nSystem', 'bookdemoproject', '', '2024-09-25', '7:31 PM', '7837', '2024-09-05 05:33:52', NULL, 'approved', '2024-09-05 05:33:51', '2024-09-05 05:33:51', NULL),
(18, 'ankita das', 'ankita@ivdisplays.com', '1025893015', 'Facility Rental Management System', 'bookdemoproject', '', '2024-09-23', '4:0 PM', '6823', '2024-09-05 05:36:01', NULL, 'pending', '2024-09-05 05:36:01', '2024-09-05 05:36:01', NULL),
(19, 'archana', 'archana@ivdisplays.com', '85922333', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '4986', '2024-09-05 05:57:31', NULL, 'approved', '2024-09-05 05:57:30', '2024-09-05 05:57:30', NULL),
(20, 'ankita Das', 'ankita@ivdisplays.com', '741234568', '', 'getintouch', 'you want us to send you our company presentation', '0000-00-00', '', '1357', '2024-09-05 06:33:34', NULL, 'approved', '2024-09-05 06:33:34', '2024-09-05 06:33:34', NULL),
(21, 'Ankita das', 'ankita@ivdisplays.com', '485644141', '', 'talktous', 'you want a representative to call you', '0000-00-00', '', '7999', '2024-09-05 06:37:01', NULL, 'approved', '2024-09-05 06:37:01', '2024-09-05 06:37:01', NULL),
(22, 'ankita das', 'ankita@ivdisplays.com', '08583914291', '', 'leader', 'you need more case studies', '0000-00-00', '', '4604', '2024-09-05 06:40:16', NULL, 'approved', '2024-09-05 06:40:16', '2024-09-05 06:40:16', NULL),
(23, 'Ankita das', 'ankita@ivdisplays.com', '08583914291', 'Efficiency Audit', 'servicepage', 'you want a representative to call you', '0000-00-00', '', '7953', '2024-09-05 06:41:27', NULL, 'approved', '2024-09-05 06:41:26', '2024-09-05 06:41:26', NULL),
(24, 'Ankita das', 'ankita@ivdisplays.com', '74632541555', 'E-form Approval and Routing System', 'bookdemo', '', '2024-09-23', '01:30 PM', '3483', '2024-09-05 06:42:50', NULL, 'approved', '2024-09-05 06:42:50', '2024-09-05 06:42:50', NULL),
(25, 'Ankita das', 'ankita@ivdisplays.com', '525544454', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '7425', '2024-09-05 06:45:58', NULL, 'approved', '2024-09-05 06:45:58', '2024-09-05 06:45:58', NULL),
(26, 'ankita das', 'ankita@ivdisplays.com', '525544454', 'Facility Rental Management System', 'bookdemoproject', '', '2024-09-26', '06:00 PM', '5216', '2024-09-05 06:47:05', NULL, 'approved', '2024-09-05 06:47:04', '2024-09-05 06:47:04', NULL),
(27, 'Prakash Raj', 'prakash@ivdisplays.com', '123', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '9878', '2024-09-05 06:56:29', NULL, 'approved', '2024-09-05 06:56:29', '2024-09-05 06:56:29', NULL),
(28, 'NKITA', 'ankita@ivdisplays.com', 'fv', 'Absence Reporting Portal', 'bookdemoproject', '', '2024-09-24', '7:0 AM', '1203', '2024-09-05 07:57:43', NULL, 'pending', '2024-09-05 07:57:43', '2024-09-05 07:57:43', NULL),
(29, 'ankita das', 'ankita@ivdisplays.com', '1025893015', 'E-form Approval and Routing System', 'bookdemo', '', '2024-09-24', '01:30 PM', '2794', '2024-09-05 10:52:10', NULL, 'approved', '2024-09-05 10:52:10', '2024-09-05 10:52:10', NULL),
(30, 'Ankita das', 'ankita@ivdisplays.com', '3435465y', 'Workshop Management\r\nSystem', 'bookdemoproject', '', '2024-09-25', '01:30 PM', '5576', '2024-09-05 12:08:02', NULL, 'approved', '2024-09-05 12:08:02', '2024-09-05 12:08:02', NULL),
(31, 'ankita das', 'ankita@ivdisplays.com', '08583914291', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '1926', '2024-09-05 12:09:07', NULL, 'approved', '2024-09-05 12:09:06', '2024-09-05 12:09:06', NULL),
(32, 'ankita das', 'ankita@ivdisplays.com', '08583914291', 'Athletic Participation Consent Form', 'bookdemomail', NULL, '2024-09-28', '01:30 PM', NULL, NULL, NULL, 'pending', '2024-09-05 12:10:04', '2024-09-05 12:10:04', NULL),
(33, 'ankita das', 'ankita@ivdisplays.com', '', 'Facility Rental Management System', 'bookdemoproject', '', '2024-09-18', '01:30 PM', '4521', '2024-09-06 06:45:18', NULL, 'approved', '2024-09-06 06:45:17', '2024-09-06 06:45:17', NULL),
(34, 'ankita', 'ankita@ivdisplays.com', '08583914291', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '5540', '2024-09-06 06:46:36', NULL, 'approved', '2024-09-06 06:46:36', '2024-09-06 06:46:36', NULL),
(35, 'Ankita Das ', 'ankita@ivdisplays.com', '', 'Workshop Management\r\nSystem', 'bookdemoproject', '', '2024-09-25', '01:30 PM', '3340', '2024-09-06 06:48:26', NULL, 'pending', '2024-09-06 06:48:25', '2024-09-06 06:48:25', NULL),
(36, 'Ankita Das', 'ankita@ivdisplays.com', '85652141454', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '9719', '2024-09-09 10:05:28', NULL, 'approved', '2024-09-09 10:05:27', '2024-09-09 10:05:27', NULL),
(37, 'VINAY MENON', 'VINAY@MERATIFF.IN', '9830400253', 'Student Transcript Application', 'morecasestudies', '', '2024-02-08', '1:30 PM', '3868', '2024-09-09 10:08:56', NULL, 'approved', '2024-09-09 10:08:55', '2024-09-09 10:08:55', NULL),
(38, 'VINAY MENON', 'VINAY@MERATIFF.IN', '9830400253', 'E-form Approval and Routing System', 'bookdemomail', NULL, '2024-09-10', '01:30 PM', NULL, NULL, NULL, 'pending', '2024-09-09 10:11:08', '2024-09-09 10:11:08', NULL),
(39, 'archana', 'archana@ivdisplays.com', '9630256256', '', 'talktous', 'you need more case studies', '0000-00-00', '', '8390', '2024-09-11 06:25:35', NULL, 'approved', '2024-09-11 06:25:35', '2024-09-11 06:25:35', NULL),
(40, 'archana', 'archana@ivdisplays.com', '9632569874', '', 'getintouch', 'you want a representative to call you', '0000-00-00', '', '4697', '2024-09-11 06:39:34', NULL, 'approved', '2024-09-11 06:39:33', '2024-09-11 06:39:33', NULL),
(41, 'archana', 'archana@ivdisplays.com', '9603654782', '', 'talktous', 'you want us to send you our company presentation', '0000-00-00', '', '8104', '2024-09-11 06:42:00', NULL, 'pending', '2024-09-11 06:42:00', '2024-09-11 06:42:00', NULL),
(42, 'archana', 'archana@ivdisplays.com', '9632564781', '', 'talktous', 'you want a representative to call you', '0000-00-00', '', '4353', '2024-09-11 06:43:41', NULL, 'approved', '2024-09-11 06:43:40', '2024-09-11 06:43:40', NULL),
(43, 'archana', 'archana@ivdisplays.com', '9632564789', '', 'getintouch', 'you need more case studies', '0000-00-00', '', '8251', '2024-09-11 06:48:05', NULL, 'approved', '2024-09-11 06:48:05', '2024-09-11 06:48:05', NULL),
(44, 'archana', 'archana@ivdisplays.com', '859632547', '', 'getintouch', 'you need more case studies', '0000-00-00', '', '3468', '2024-09-11 06:54:22', NULL, 'approved', '2024-09-11 06:54:22', '2024-09-11 06:54:22', NULL),
(45, 'archana', 'archana@ivdisplays.com', '8563297845', '', 'getintouch', 'you want us to send you our company presentation', '0000-00-00', '', '6024', '2024-09-11 06:57:54', NULL, 'approved', '2024-09-11 06:57:53', '2024-09-11 06:57:53', NULL),
(46, 'ankita Das', 'ankita@ivdisplays.com', '85621144', '', 'getintouch', 'you want us to send you our company presentation', '0000-00-00', '', '7752', '2024-09-11 07:03:02', NULL, 'pending', '2024-09-11 07:03:02', '2024-09-11 07:03:02', NULL),
(47, 'ankita das', 'ankita@ivdisplays.com', '08583914291', '', 'getintouch', 'you want us to send you our company presentation', '0000-00-00', '', '1128', '2024-09-11 07:14:02', NULL, 'pending', '2024-09-11 07:14:01', '2024-09-11 07:14:01', NULL),
(48, 'archana', 'archana@ivdisplays.com', '9632564789', '', 'getintouch', 'you want us to send you our company presentation', '0000-00-00', '', '3402', '2024-09-11 07:17:05', NULL, 'approved', '2024-09-11 07:17:04', '2024-09-11 07:17:04', NULL),
(49, 'archana', 'archana@ivdisplays.com', '8632537891', '', 'getintouch', 'you want a representative to call you', '0000-00-00', '', '9037', '2024-09-11 07:18:04', NULL, 'approved', '2024-09-11 07:18:03', '2024-09-11 07:18:03', NULL),
(50, 'ankitta', 'ankita@ivdisplays.com', '55252141414', '', 'talktous', 'you need more case studies', '0000-00-00', '', '5756', '2024-09-11 07:44:16', NULL, 'approved', '2024-09-11 07:44:15', '2024-09-11 07:44:15', NULL),
(51, 'ankita das', 'ankita@ivdisplays.com', '8552525225', '', 'talktous', 'you want us to send you our company presentation', '0000-00-00', '', '1148', '2024-09-11 07:50:54', NULL, 'approved', '2024-09-11 07:50:54', '2024-09-11 07:50:54', NULL),
(52, 'Archana', 'archana@ivdisplays.com', '', '', 'getintouch', 'you need more case studies', '0000-00-00', '', '5732', '2024-09-11 09:02:18', NULL, 'approved', '2024-09-11 09:02:17', '2024-09-11 09:02:17', NULL),
(53, 'Archana', 'archana@ivdisplays.com', '', '', 'talktous', 'you want us to send you our company presentation', '0000-00-00', '', '8625', '2024-09-11 09:02:54', NULL, 'approved', '2024-09-11 09:02:53', '2024-09-11 09:02:53', NULL),
(54, 'ankita das', 'ankita@ivdisplays.com', '8583914291', '', 'talktous', 'you want us to send you our company presentation', '0000-00-00', '', '4014', '2024-09-11 09:11:25', NULL, 'approved', '2024-09-11 09:11:25', '2024-09-11 09:11:25', NULL),
(55, 'archana', 'archana@ivdisplays.com', '9602358746', '', 'talktous', 'you want a representative to call you', '0000-00-00', '', '9211', '2024-09-11 09:21:25', NULL, 'approved', '2024-09-11 09:21:25', '2024-09-11 09:21:25', NULL),
(56, 'Archana ', 'archana@ivdisplays.com', '', '', 'getintouch', 'you want a representative to call you', '0000-00-00', '', '6782', '2024-09-11 09:52:12', NULL, 'approved', '2024-09-11 09:52:12', '2024-09-11 09:52:12', NULL),
(57, 'ankita', 'ankita@ivdisplays.com', '8583914291', '', 'getintouch', 'you need more case studies', '0000-00-00', '', '6904', '2024-09-11 11:55:58', NULL, 'approved', '2024-09-11 11:55:58', '2024-09-11 11:55:58', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contactpagedetails`
--

CREATE TABLE `contactpagedetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `linkdin_link` varchar(255) DEFAULT NULL,
  `map` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactpagedetails`
--

INSERT INTO `contactpagedetails` (`id`, `page_title`, `address`, `email`, `phone`, `linkdin_link`, `map`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Send a Message', '519 East Rd Belford, New Jersey(NJ), 07718', 'connect@appostrophi.com', '+1 0123 456 789', 'https://www.linkedin.com/company/appostrophi/', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.9575193489122!2d-74.08822232451735!3d40.40979185606245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2312c525ffcc9%3A0x4388309a75497a10!2s519%20E%20Rd%2C%20Belford%2C%20NJ%2007718%2C%20USA!5e0!3m2!1sen!2sin!4v1724261446549!5m2!1sen!2sin', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contactpagedetails_new`
--

CREATE TABLE `contactpagedetails_new` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `linkdin_link` varchar(255) DEFAULT NULL,
  `map` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactpagedetails_new`
--

INSERT INTO `contactpagedetails_new` (`id`, `page_title`, `address`, `email`, `phone`, `linkdin_link`, `map`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Send a Message', '519 East Rd Belford, New Jersey(NJ), 07718', 'support@appostrophi.com', '+1 0123 456 789', 'https://www.linkedin.com/company/appostrophi/', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.9575193489122!2d-74.08822232451735!3d40.40979185606245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2312c525ffcc9%3A0x4388309a75497a10!2s519%20E%20Rd%2C%20Belford%2C%20NJ%2007718%2C%20USA!5e0!3m2!1sen!2sin!4v1724261446549!5m2!1sen!2sin', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `phone` varchar(200) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `email`, `phone`, `city`, `message`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'treting', 'ankita@ivdisplays.com', '86148585252', 'new Jersey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzIzNDQ1MzMxfQ.ADQPxmYyyQQ2V1UZGuizflApbtS0GKak8F_5U2CHS3s', '2024-08-21 10:45:01', '2024-08-21 10:45:01', NULL),
(5, 'ankita Das', 'ankita@ivdisplays.com', '5455555', '', 'nhgvbmnj,', '2024-08-23 07:15:56', '2024-08-23 07:15:56', NULL),
(6, 'ankita', 'ankita@ivdisplays.com', '851525621544', 'fvbg', 'dgnjhg', '2024-08-26 06:48:45', '2024-08-26 06:48:45', NULL),
(7, 'archana', 'archana@ivdisplays.com', '9605693256', '', 'sdfsdfsdf', '2024-08-26 10:02:47', '2024-08-26 10:02:47', NULL),
(8, 'ankita', 'ankita@appostrophi.com', '353465465', 'fgbf', 'vb c', '2024-08-26 10:17:17', '2024-08-26 10:17:17', NULL),
(9, 'archana', 'archana@ivdisplays.com', '9630256897', '', 'This is test message', '2024-08-27 05:32:23', '2024-08-27 05:32:23', NULL),
(10, 'archana', 'archana@ivdisplays.com', '9632569874', '', 'This is message', '2024-08-27 05:34:03', '2024-08-27 05:34:03', NULL),
(11, 'archana', 'archana@ivdisplays.com', '9632568974', '', 'sgfdg', '2024-08-27 05:34:49', '2024-08-27 05:34:49', NULL),
(12, 'ankita das', 'ankita@ivdisplays.com', '8583914291', 'KOLKATA', 'fhfgmjh gbjnghv', '2024-08-27 06:18:00', '2024-08-27 06:18:00', NULL),
(13, 'Ankita das', 'ankita@ivdisplays.com', '08583914291', 'gngn', 'dfvgxb', '2024-09-05 06:39:27', '2024-09-05 06:39:27', NULL),
(14, 'archana', 'archana@ivdisplays.com', '', '', 'test', '2024-09-11 06:26:15', '2024-09-11 06:26:15', NULL),
(15, 'archana', 'archana@ivdisplays.com', '9632564789', 'kolkata', 'test', '2024-09-11 07:19:20', '2024-09-11 07:19:20', NULL),
(16, 'archana', 'archana@ivdisplays.com', '9632564789', 'kolkata', 'test', '2024-09-11 09:22:41', '2024-09-11 09:22:41', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contactsbanner`
--

CREATE TABLE `contactsbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactsbanner`
--

INSERT INTO `contactsbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_contact-banner.jpg', '878585_contact.jpg', 'Contact US', 'We’re Here to Address Your Queries', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `contactsbanner_new`
--

CREATE TABLE `contactsbanner_new` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contactsbanner_new`
--

INSERT INTO `contactsbanner_new` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_contact-banner.jpg', '878585_contact.jpg', 'Contact US', 'We are Here to Address Your Queries', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homepagetitle`
--

CREATE TABLE `homepagetitle` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homepagetitle`
--

INSERT INTO `homepagetitle` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Simplifying Systems, Amplifying Operations', NULL, NULL, NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homepartners`
--

CREATE TABLE `homepartners` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `subtiltle_one` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homepartners`
--

INSERT INTO `homepartners` (`id`, `title`, `subtitle`, `short_des`, `subtiltle_one`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Why Partner With Appostrophi?', 'The unbreakable security you can trust!', 'We implement robust measures and protocols to safeguard your sensitive information with unwavering security.', 'An Effortless Tomorrow Carefully Created Together', '2024-08-16 06:34:15', '2024-08-16 06:34:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homepartners_new`
--

CREATE TABLE `homepartners_new` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `subtiltle_one` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homepartners_new`
--

INSERT INTO `homepartners_new` (`id`, `title`, `subtitle`, `short_des`, `subtiltle_one`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Partner With Us', 'To undergo the difference that efficient, expertly architected workflows can make.\nIt ensures that you are involved in every step of the process.\n', 'Talk to us', 'Embark on a journey towards transforming the way you work.', '2024-08-16 06:34:15', '2024-08-16 06:34:15', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homeservies`
--

CREATE TABLE `homeservies` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_hover` varchar(200) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homeservies`
--

INSERT INTO `homeservies` (`id`, `image`, `image_hover`, `title`, `short_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '785125899_service-one.png', '1234_white_service-one.png', 'Our gap analysis fine-tunes the strategy for your institution', 'We meticulously assess your operations to identify areas for improvement, providing a clear roadmap for optimization.', '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL),
(2, '785125899_service-two.png', '1234_white_service-two.png', 'Structured audit that empowers your Institution', 'Gain valuable insights with our broad review. Identify opportunities to streamline resource allocation and maximize your institutional goals.', '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL),
(3, '785125899_service-three.png', '1234_white_service-three.png', 'Bespoke software solutions tailored for your institution', 'From the Paper Trail to Programs that Matter: Modernize your institution\'s operations with streamlined digital systems.', '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL),
(4, '785125899_service-four.png', '1234_white_service-four.png', 'Make informed decisions for your institution', 'We ensure efficient data \n                      collection, management, and reporting, empowering your \n                      institute to make informed decisions.', '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homeservies_new`
--

CREATE TABLE `homeservies_new` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_hover` varchar(200) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `image_ser` varchar(255) DEFAULT NULL,
  `serv_title` text DEFAULT NULL,
  `heading` varchar(255) DEFAULT NULL,
  `sub_heading` varchar(255) DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mob_image` varchar(255) DEFAULT NULL,
  `det_firs_par` varchar(255) DEFAULT NULL,
  `imp_head` varchar(255) DEFAULT NULL,
  `imp_para` text DEFAULT NULL,
  `imp_img` varchar(255) DEFAULT NULL,
  `bene_head` varchar(255) DEFAULT NULL,
  `bene_first_title` varchar(255) DEFAULT NULL,
  `bene_first_para` text DEFAULT NULL,
  `bene_second_title` varchar(255) DEFAULT NULL,
  `bene_second_para` text DEFAULT NULL,
  `bene_third_title` varchar(255) DEFAULT NULL,
  `bene_third_para` text DEFAULT NULL,
  `bene_img` varchar(255) DEFAULT NULL,
  `talk_img` varchar(255) DEFAULT NULL,
  `talk_head` varchar(255) DEFAULT NULL,
  `talk_para` text DEFAULT NULL,
  `work_img` varchar(255) DEFAULT NULL,
  `work_head` varchar(255) DEFAULT NULL,
  `work_para` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homeservies_new`
--

INSERT INTO `homeservies_new` (`id`, `image`, `image_hover`, `title`, `subtitle`, `short_des`, `image_ser`, `serv_title`, `heading`, `sub_heading`, `banner_image`, `banner_mob_image`, `det_firs_par`, `imp_head`, `imp_para`, `imp_img`, `bene_head`, `bene_first_title`, `bene_first_para`, `bene_second_title`, `bene_second_para`, `bene_third_title`, `bene_third_para`, `bene_img`, `talk_img`, `talk_head`, `talk_para`, `work_img`, `work_head`, `work_para`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '785125899_service-one.png', '1234_white_service-one.png', 'Workflow Management', 'Designing workflows that are beyond compare', 'We re-engineer underperforming areas by integrating automation and creating a distinctive operational system.', NULL, NULL, 'Workflow Management and Automation', '', '1730262060184register.png', '1730262062076Screenshot.png', 'Our workflow management transforms your intricate operations digitally with ease from start to finish. ', 'It’s Importance', 'Where your workflows span multiple departments and involve manual handoffs, our service enhances operational flow within them by improving communication and accountability at every step and reducing the likelihood of errors.', '1730262063673Screenshot.png', 'It\'s Benefits', 'Consistency and Accuracy', 'Ensure that each step of the workflow is handled correctly, with less variability and fewer errors.', 'Improved Communication', 'Facilitate better coordination within the institution by ensuring that information flows smoothly and reliably.', 'Scalable Growth', 'Builds workflows that grow with you, ensuring your processes remain progressive.', '1730262065124applicationstatus.png', '1730262068451passwordencryption.png', 'Talk to Expert', 'Facilitate better coordination within the institution by ensuring that information flows smoothly and reliably.fff', '1730262066660pdf.png', 'Why work with us', '', '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL),
(2, '785125899_service-two.png', '1234_white_service-two.png', 'Programming', 'An Effortless Future-Ready Programming Solution', 'We develop solutions that fit your requirements, ensuring your technological framework is functional and future-proof.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL),
(3, '785125899_service-three.png', '1234_white_service-three.png', 'Efficiency Audit', 'An audit assembled with robot-like efficiency', 'We efficiently investigate and examine your operations, pointing out possibilities and a road map leading to better outcomes.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL),
(4, '785125899_service-four.png', '1234_white_service-four.png', 'Gap Analysis', 'what’s holding few areas together and  others apart ', 'Reveal the gaps you might not even know existed through our gap analysis, providing clear insights for optimization.', '1730791434316register.png', 'Gap analysis', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2024-08-16 05:05:42', '2024-08-16 05:05:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hometitles`
--

CREATE TABLE `hometitles` (
  `id` int(11) NOT NULL,
  `projecttitle` varchar(255) NOT NULL,
  `servicetitle` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hometitles`
--

INSERT INTO `hometitles` (`id`, `projecttitle`, `servicetitle`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'We listen beyond the surface level and understand your institution\'s need for digital transformation.', 'Services We Render', '2024-08-16 05:44:13', '2024-08-16 05:44:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homeuniques`
--

CREATE TABLE `homeuniques` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `short_des` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homeuniques`
--

INSERT INTO `homeuniques` (`id`, `title`, `image`, `short_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'You Are Unique!', '78512555_unique_img.png', 'Through a collaborative process and exploration, we can co-create a tailored strategy that empowers you to navigate not just today\'s challenges but also the opportunities of the future.', '2024-08-16 06:36:19', '2024-08-16 06:36:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homeuniques_new`
--

CREATE TABLE `homeuniques_new` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `short_des` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homeuniques_new`
--

INSERT INTO `homeuniques_new` (`id`, `title`, `image`, `short_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Elevate your uniqueness!', '78512555_unique_img.png', 'We understand that every institution has a distinct identity. With a vision you carry, adding our expertise cohesively aligns a journey, bringing your ideas to life with solutions that elevate your institution\'s uniqueness.', '2024-08-16 06:36:19', '2024-08-16 06:36:19', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homevisision`
--

CREATE TABLE `homevisision` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homevisision`
--

INSERT INTO `homevisision` (`id`, `title`, `image`, `short_des`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Our Vision', '78512555_vision_img.png', 'We Envision A Future Where Your Functionalities Transition Smoothly To Digitization', 'Our comprehensive analysis delves into your existing workflows to pinpoint areas ripe for automation', '2024-08-16 06:20:43', '2024-08-16 06:20:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `homevisision_new`
--

CREATE TABLE `homevisision_new` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homevisision_new`
--

INSERT INTO `homevisision_new` (`id`, `title`, `image`, `short_des`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Our Vision', '78512555_vision_img.png', 'We envision a future where your operations seamlessly evolve through digital transformation.\r\n', 'Our comprehensive analysis delves into your existing workflows to pinpoint areas ripe for automation', '2024-08-16 06:20:43', '2024-08-16 06:20:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` int(11) NOT NULL,
  `location_name` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `location_name`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Middle School', '2024-08-12 07:32:09', '2024-08-12 07:32:09', NULL),
(2, 'Junior School', '2024-08-12 07:35:48', '2024-08-12 07:35:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `pageseotag`
--

CREATE TABLE `pageseotag` (
  `id` int(11) NOT NULL,
  `page_name` varchar(255) DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_key` text DEFAULT NULL,
  `meta_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pageseotag`
--

INSERT INTO `pageseotag` (`id`, `page_name`, `meta_title`, `meta_key`, `meta_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(2, 'Home', 'Best K12 School Management System in New Jersey, USA | Appostrophi ', 'K12 education software,School management system,workflow automation tools,gap analysis report,efficiency audit,programming tools,new jersey department of education,doe new jersey,nj smart,security systems', 'Appostrophi drives digital transformation for K-12 schools in New Jersey, delivering solutions from gap analysis to programming that automates and modernizes workflows', '2024-11-05 12:07:59', '2024-11-05 12:07:59', NULL),
(3, 'About', 'Leveraging over 12 years of expertise to streamline workflows in k12 schools', 'School management software,K12 education software,student information system software,school management system,education ERP solutions,academic management software', 'With a focus on K12 education software and school management systems, we deliver solutions with modernization', '2024-11-05 12:08:38', '2024-11-05 12:08:38', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `privacybanner`
--

CREATE TABLE `privacybanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privacybanner`
--

INSERT INTO `privacybanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78555_privacy.jpg', '5555_privacy-mobile.jpg', 'Privacy Policy', 'We Shield Your Personal Data', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `privacypagedetails`
--

CREATE TABLE `privacypagedetails` (
  `id` int(11) NOT NULL,
  `page_title` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` longtext DEFAULT NULL,
  `page_des` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `privacypagedetails`
--

INSERT INTO `privacypagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, ' <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells \r\n                                You about Your privacy rights and how the law protects You.\r\n                            </p>\r\n                            <p>We use Your Personal data to provide and improve the Service. \r\n                                By using the Service, You agree to the collection and use of \r\n                                information in accordance with this Privacy Policy.                             \r\n                            </p>\r\n                            <div class=\'privcy-head-sec\'>\r\n                                <h2 class=\"after-head\">Interpretation and Definitions</h2>\r\n                                <h3>Interpretation</h3>\r\n                                <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. \r\n                                The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>\r\n                                <h4>Definitions</h4>\r\n                                <p>For the purposes of this Privacy Policy:</p>\r\n                                <p><span class=\'bold-sec\'>Account</span> means a unique account created for You to access our Service or parts of our Service.</p>\r\n                                <p><span class=\'bold-sec\'>Affiliate</span> means an entity that controls, is controlled by or is under common control with a party, \r\n                                where \"control\" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote \r\n                                for election of directors or other managing authority.\r\n                                </p>\r\n                                <p><span class=\'bold-sec\'>Company</span> (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) \r\n                                refers to Appostrophi, New Jersey.</p>\r\n                                <p><span class=\'bold-sec\'>Cookies</span> are small files that are placed on Your computer, mobile device or any other device by a website, \r\n                                    containing the details of Your browsing history on that website among its many uses.</p>\r\n                                <p><span class=\'bold-sec\'>Country</span> refers to: New Jersey, United States</p>\r\n                                <p><span class=\'bold-sec\'>Device</span> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</p>\r\n                                <p><span class=\'bold-sec\'>Personal Data</span> is any information that relates to an identified or identifiable individual.</p>\r\n                           \r\n                                <p><span class=\'bold-sec\'>Service</span> refers to the Website.</p>\r\n                                <p><span class=\'bold-sec\'>Service Provider</span> means any natural or legal person who processes the data on behalf of the Company. \r\n                                    It refers to third-party companies or individuals employed by the Company to facilitate the Service, to provide the Service on behalf of the Company, \r\n                                    to perform services related to the Service or to assist the Company in analyzing how the Service is used.</p>\r\n\r\n                                <p><span class=\'bold-sec\'>Usage Data</span> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).</p>\r\n                           \r\n                           <p><span class=\'bold-sec\'>Website</span> refers to Appostrophi, accessible from <a class=\"link-color\" href=\"https://www.appostrophi.com/\">https://appostrophi.com/</a></p>\r\n                           <p><span class=\'bold-sec\'>You</span> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.</p>\r\n                            </div>\r\n\r\n\r\n                            <div class=\'privcy-head-sec\'>\r\n                                <h2 class=\'after-head\'>Collecting and Using Your Personal Data</h2>\r\n                                <h3>Types of Data Collected</h3>\r\n                                <h4>Personal Data</h4>\r\n                                <p>While using Our Service, We may ask You to provide Us with certain personally identifiable information that \r\n                                    can be used to contact or identify You. \r\n                                    Personally identifiable information may include, but is not limited to:\r\n                                </p>\r\n                                <ul>\r\n                                    <li>First name and last name</li>\r\n                                    <li>Email address</li>\r\n                                    <li>Phone number</li>\r\n                                    <li>City</li>\r\n                                </ul>\r\n                                <h4>Usage Data</h4>\r\n                                <p>Usage Data is collected automatically when using the Service.</p>\r\n                                <p>Usage Data may include information such as Your Device\'s Internet Protocol address (e.g. IP address), \r\n                                    browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, \r\n                                    the time spent on those pages, unique device identifiers and other diagnostic data.</p>\r\n                                <p>When You access the Service by or through a mobile device, We may collect certain information automatically, \r\n                                    including, but not limited to, the type of mobile device You use, Your mobile device unique ID, \r\n                                    the IP address of Your mobile device, Your mobile operating system, \r\n                                    the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.\r\n                                </p>\r\n                                <p>We may also collect information that Your browser sends whenever \r\n                                    You visit our Service or when You access the Service by or through a mobile device.</p>\r\n                                <h4>Tracking Technologies and Cookies</h4>\r\n                                <p>We use Cookies and similar tracking technologies to track the activity on Our \r\n                                    Service and store certain information. Tracking technologies used are beacons, tags, \r\n                                    and scripts to collect and track information and to improve and analyze Our Service. \r\n                                    The technologies We use may include:</p>', '789525252_our-expert_img.png', '<ul class=\'cooks-sec\'>\r\n    <li><a><span class=\'bold-sec\'> Cookies or Browser Cookies</span></a><span> A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may not be able to use some parts of our Service. Unless you have adjusted Your browser setting so that it will refuse Cookies, our Service may use Cookies.</span></li>\r\n<li><a> <span class=\'bold-sec\'>Web Beacons</span></a><span> Certain sections of our Service and our emails may contain small electronic files known as web beacons (also referred to as clear gifs, pixel tags, and single-pixel gifs) that permit the Company, for example, to count users who have visited those pages or opened an email and for other related website statistics (for example, recording the popularity of a certain section and verifying system and server integrity).\r\n</span></li>\r\n</ul>\r\n\r\n\r\n\r\n<p>Cookies can be \"Persistent\" or \"Session\" Cookies. Persistent Cookies remain on Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close Your web browser. Learn more about cookies on the Privacy Policies website article.</p>\r\n\r\n<p>We use both Session and Persistent Cookies for the purposes set out below:</p>\r\n<h4 class=\"cookies-next\">Necessary / Essential Cookies</h4>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Type:</span> Session Cookies</p>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Administered by:</span> Us</p>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Purpose:</span> These Cookies are essential to provide You with services available through the Website and to \r\n    enable You to use some of its features. They help to authenticate users and prevent fraudulent use of \r\n    user accounts. Without these Cookies, the services that You have asked for cannot be provided, \r\n    and We only use these Cookies to provide You with those services.</p>\r\n<h4 class=\"cookies-next\">Cookies Policy / Notice Acceptance Cookies</h4>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Type:</span> Persistent Cookies</p>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Administered by:</span> Us</p>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Purpose:</span> These Cookies identify if users have accepted the use of cookies on the Website.</p>\r\n\r\n<h4 class=\"cookies-next\">Functionality Cookies</h4>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Type:</span> Persistent Cookies</p>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Administered by:</span> Us</p>\r\n<p class=\'bottom-main\'><span class=\'bold-sec\'>Purpose:</span> These Cookies allow us to remember choices You make when You use the Website, \r\n    such as remembering your login details or language preference. The purpose of these \r\n    Cookies is to provide You with a more personal experience \r\n    and to avoid You having to re-enter your preferences every time You use the Website.\r\n</p>\r\n<p>For more information about the cookies we use and your choices regarding cookies,\r\n     please visit our Cookies Policy or the Cookies section of our Privacy Policy.\r\n</p>\r\n</div>\r\n\r\n<div class=\'privcy-head-sec\'>\r\n<h2>Use of Your Personal Data</h2>\r\n<p>The Company may use Personal Data for the following purposes:</p>\r\n<p><span class=\'bold-sec\'>To provide and maintain our Service,</span> including to monitor the usage of our Service.</p>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>To manage Your Account</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>to manage Your registration as a user of the Service. The Personal Data You provide can give You access \r\n    to different functionalities of the Service that are available to You as a registered user. \r\n</p>\r\n</div>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>For the performance of a contract</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.\r\n</p>\r\n</div>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>To contact You</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>\r\nTo contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application\'s push notifications regarding updates or informative communications related to the functionalities,\r\n products or contracted services, including the security updates, when necessary or reasonable for their implementation.\r\n</p>\r\n</div>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>To provide You</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>\r\nwith news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information. </p>\r\n</div>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>To manage Your requests</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>\r\nTo attend and manage Your requests to Us. </p>\r\n</div>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>For business transfers</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>\r\nWe may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.\r\n</p>\r\n</div>\r\n\r\n<div class=\'personal-data-align-sec\'>\r\n<p class=\'data-align-left\'>For other purposes</p>\r\n<p class=\'data-align-md\'>:</p>\r\n<p class=\'data-align-right\'>\r\nWe may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.\r\n</p>\r\n</div>\r\n\r\n<p>We may share Your personal information in the following situations:</p>\r\n\r\n<div class=\'personal-data-ul\'>\r\n<ul>\r\n    <li>\r\n        <div class=\'personal-data-align-sec\'>\r\n            <p class=\'data-align-left\'>  With Service Providers</p>\r\n            <p class=\'data-align-md\'>:</p>\r\n            <p class=\'data-align-right\'>\r\n            We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.</p>\r\n        </div>\r\n    </li>\r\n    <li>\r\n        <div class=\'personal-data-align-sec\'>\r\n            <p class=\'data-align-left\'>   For business transfers</p>\r\n            <p class=\'data-align-md\'>:</p>\r\n            <p class=\'data-align-right\'>\r\n            We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.\r\n            </p>\r\n        </div>\r\n    </li>\r\n    <li>\r\n        <div class=\'personal-data-align-sec\'>\r\n            <p class=\'data-align-left\'> With Affiliates</p>\r\n            <p class=\'data-align-md\'>:</p>\r\n            <p class=\'data-align-right\'>\r\n            We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.\r\n            </p>\r\n        </div>\r\n    </li>\r\n\r\n    <li>\r\n        <div class=\'personal-data-align-sec\'>\r\n            <p class=\'data-align-left\'> With business partners</p>\r\n            <p class=\'data-align-md\'>:</p>\r\n            <p class=\'data-align-right\'>\r\n            We may share Your information with Our business partners to offer You certain products, services or promotions. </p>\r\n        </div>\r\n    </li>\r\n\r\n    <li>\r\n        <div class=\'personal-data-align-sec\'>\r\n            <p class=\'data-align-left\'>  With other users</p>\r\n            <p class=\'data-align-md\'>:</p>\r\n            <p class=\'data-align-right\'>\r\n            when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.\r\n            </p>\r\n        </div>\r\n    </li>\r\n\r\n    <li>\r\n        <div class=\'personal-data-align-sec\'>\r\n            <p class=\'data-align-left\'>  With Your consent</p>\r\n            <p class=\'data-align-md\'>:</p>\r\n            <p class=\'data-align-right\'>\r\n            We may disclose Your personal information for any other purpose with Your consent.\r\n</p>\r\n        </div>\r\n    </li>\r\n</ul>\r\n</div>\r\n\r\n\r\n</div>\r\n<div class=\'privcy-head-sec\'>\r\n<h2>Retention of Your Personal Data</h2>\r\n<p>The Company will retain Your Personal Data only for \r\nas long as is necessary for the purposes set out in this Privacy Policy.\r\n We will retain and use Your Personal Data to the extent necessary to comply with our \r\n legal obligations (for example, if we are required to retain your data to comply with applicable laws), \r\nresolve disputes, and enforce our legal agreements and policies.\r\n</p>\r\n<p>The Company will also retain Usage Data for internal analysis purposes.\r\n Usage Data is generally retained for a shorter period of time, except when \r\n this data is used to strengthen the security or to improve the functionality of Our Service, \r\nor We are legally obligated to retain this data for longer time periods.</p>\r\n</div>', '<div class=\'privcy-head-sec transfer-data\'>\r\n    <h2>Transfer of Your Personal Data</h2>\r\n    <p>Your information, including Personal Data, is processed at the Company\'s operating offices and in any other places where the parties involved in the processing are located. It means that this information may be transferred to — and maintained on — computers located outside of Your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from Your jurisdiction.\r\n    </p>\r\n    <p>Your consent to this Privacy Policy followed by Your submission of such information represents Your agreement to that transfer.</p>\r\n    <p>The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of Your data and other personal information.</p>\r\n   \r\n</div>\r\n<div class=\'privcy-head-sec\'>\r\n    <h2>Delete Your Personal Data</h2>\r\n    <p>You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You.\r\n        </p>\r\n    <p>Our Service may give You the ability to delete certain information about You from within the Service.</p>\r\n    <p>You may update, amend, or delete Your information at any time by signing in to Your Account, \r\n        if you have one, and visiting the account settings section that allows you to manage\r\n        Your personal information. You may also contact Us to request access to, correct, or\r\n        delete any personal information that You have provided to Us.</p>\r\n    <p>Please note, however, that We may need to retain certain information when we have a legal obligation or lawful basis to do so.</p>\r\n</div>\r\n<div class=\'privcy-head-sec\'>\r\n    <h2>Disclosure of Your Personal Data</h2>\r\n    <div class=\'disclose-sec\'>\r\n    <h4>Business Transactions</h4>\r\n    <p>If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. \r\n        We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.\r\n    </p>\r\n    </div>\r\n    <div class=\'disclose-sec\'>\r\n        <h4>Law enforcement</h4>\r\n        <p>Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so by law or in response to valid requests by public authorities (e.g. a court or a government agency).\r\n        </p>\r\n    </div>\r\n\r\n    <div class=\'disclose-sec\'>\r\n    <h4>Other legal requirements</h4>\r\n    <p>The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:</p>\r\n    <ul>\r\n        <li>  Comply with a legal obligation</li>\r\n        <li> Protect and defend the rights or property of the Company</li>\r\n        <li>   Prevent or investigate possible wrongdoing in connection with the Service</li>\r\n        <li> Protect the personal safety of Users of the Service or the public</li>\r\n        <li> Protect against legal liability</li>\r\n    </ul>\r\n    </div>\r\n\r\n  \r\n\r\n  \r\n</div>\r\n\r\n<div class=\'privcy-head-sec\'>\r\n<h2>Security of Your Personal Data</h2>\r\n<p>The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.\r\n     While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.</p>\r\n</div>\r\n\r\n<div class=\'privcy-head-sec another-new\'>\r\n<h2 class=\'after-head\'>Children\'s Privacy</h2>\r\n<p>Our Service does not address anyone under the age of 13. We do not knowingly collect personally \r\n    identifiable information from anyone under the age of 13. If You are a parent or guardian and \r\n    You are aware that Your child has provided Us with Personal Data, please contact Us. If We \r\n    become aware that We have collected Personal Data from anyone under the age of 13 without verification of parental consent,\r\n     We take steps to remove that information from Our servers.</p>\r\n<p>If We need to rely on consent as a legal basis for processing Your information and Your country requires consent from a parent, \r\n    We may require Your parent\'s consent before We collect and use that information.</p>\r\n\r\n</div>\r\n\r\n<div class=\'privcy-head-sec another-new\'>\r\n<h2 class=\'after-head\'>Links to Other Websites</h2>\r\n<p>Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, You will be directed to that third party\'s site. We strongly advise You to review the Privacy Policy of every site You visit.</p>\r\n<p>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</p>\r\n\r\n</div>\r\n\r\n<div class=\'privcy-head-sec another-new\'>\r\n<h2 class=\'after-head\'>Changes to this Privacy Policy</h2>\r\n<p>We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy Policy on this page.</p>\r\n<p>We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective and update the \"Last updated\" date at the top of this Privacy Policy.</p>\r\n    <p>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</p>\r\n</div>  \r\n<div class=\'privcy-head-sec another-new\'>\r\n<h2 class=\'after-head\'>Contact Us</h2>\r\n<p>\r\nIf you have any questions about this Privacy Policy, You can contact us:\r\n</p>\r\n<p> By email: customer.care@appostrophi.com</p>\r\n  </div> \r\n', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectbanner`
--

CREATE TABLE `projectbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectbanner`
--

INSERT INTO `projectbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_Our-projects-banner.jpg', '785125585_Our-projects.jpg', 'Our Projects', 'That Set Us Apart!', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectbanner_new`
--

CREATE TABLE `projectbanner_new` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectbanner_new`
--

INSERT INTO `projectbanner_new` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_Our-projects-banner.jpg', '785125585_Our-projects.jpg', 'Our Projects', 'That Set Us Apart!', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectpagedetails`
--

CREATE TABLE `projectpagedetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `page_des_new` text DEFAULT NULL,
  `image_second` varchar(255) DEFAULT NULL,
  `image_third` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectpagedetails`
--

INSERT INTO `projectpagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `page_des_new`, `image_second`, `image_third`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Listed here are some of our astounding work which powers major institutions like yours', NULL, NULL, NULL, NULL, '', '', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectpagedetails_new`
--

CREATE TABLE `projectpagedetails_new` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `page_des_new` text DEFAULT NULL,
  `image_second` varchar(255) DEFAULT NULL,
  `image_third` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectpagedetails_new`
--

INSERT INTO `projectpagedetails_new` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `page_des_new`, `image_second`, `image_third`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Listed here are some of our astounding work which powers major institutions like yours', '1730309061370passwordencryption.png', 'Delivered Project', 'Satisfied Client', 'Skilled Experts', '17303070213231720245774_SMFA.logo-22.png', '1730308415402Screenshot.png', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projectpageseotag`
--

CREATE TABLE `projectpageseotag` (
  `id` int(11) NOT NULL,
  `page_name` varchar(255) DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_key` text DEFAULT NULL,
  `meta_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projectpageseotag`
--

INSERT INTO `projectpageseotag` (`id`, `page_name`, `meta_title`, `meta_key`, `meta_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '9', 'Athletic2', 'Athletic5', 'Athletic3', '2024-11-05 12:52:20', '2024-11-05 12:52:20', NULL),
(2, '6', 'oprsq', 'opras', 'dcfsd', '2024-11-05 12:52:42', '2024-11-05 12:52:42', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `video_image` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `first_title` varchar(255) DEFAULT NULL,
  `first_des` text DEFAULT NULL,
  `second_title` varchar(255) DEFAULT NULL,
  `second_des` text DEFAULT NULL,
  `third_title` varchar(255) DEFAULT NULL,
  `third_des` text DEFAULT NULL,
  `short_de_pro` text DEFAULT NULL,
  `project_link` varchar(200) DEFAULT NULL,
  `home_seq` int(11) DEFAULT NULL,
  `pro_seq` int(11) DEFAULT NULL,
  `home_case` int(11) DEFAULT NULL,
  `pro_case` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `title`, `slug`, `short_des`, `video`, `video_image`, `image`, `first_title`, `first_des`, `second_title`, `second_des`, `third_title`, `third_des`, `short_de_pro`, `project_link`, `home_seq`, `pro_seq`, `home_case`, `pro_case`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'E-form Approval and Routing System', 'e-form-approval-routing-system', 'Turbocharge paper trails into digital miles. how?', 'Watch_Video_Eform.mp4', '47555_video-img-sec.png', '78512555_project-img.jpg', 'Objective', 'Replacing a disparate system with an intelligent web based e form system.', 'Resolution', '<p>The new e-form system are filled out faster because the new age programming associated with it, \r\n                      can automatically format, calculate, look up, and validate information for the user. \r\n                      With routing and notification via e-mail, approval cycle times were significantly reduced. With electronic submission of completed forms,\r\n                       the institution was eliminating the cost of rekeying data and the associated errors.</p>', 'Outcome', '<p>Zero Error and 100% uptime since going live in 2019</p>', 'Simplified ERP for K12 schools', 'https://actionform.appostrophi.com/', 1, 1, 1, 1, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(2, 'Workshop Management\r\nSystem', 'workshop-management-system', 'Believe there\'s no  easy way to manage workshops?', '785852_Workshop_Management_Video.mp4', 'workshop_video_thubmail.png', '78512555_workshop_img.jpg', 'Objective', 'To establish a platform that resolves the absence of a structured training and notification system, enabling effective communication and specific training enrollment tailored to staff needs.', 'Resolution', '<p>We developed a robust workshop management system that centralized training information by department, automated targeted notifications and reminders, simplified registration and seat allocation, and managed session organization for large employee batches.</p>\r\n\r\n<ul class=\"reol-ul-sec\">\r\n<li><span class=\"case-left\">Centralization:</span>\r\n<span class=\"case-right\">  Developed a platform to publish all training information.</span></li>\r\n\r\n<li><span class=\"case-left\">Automation:</span>\r\n<span class=\"case-right\">  Integrated automated email notifications for updates and reminders.</span></li>\r\n\r\n\r\n<li><span class=\"case-left\">Efficiency:</span>\r\n<span class=\"case-right\">  Simplified the registration process and organized multiple sessions.</span></li>\r\n</ul>', 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Increased participation of relevant employees.</li>\r\n<li>Reduced irrelevant training sessions.</li>\r\n<li>Improved communication and reduced administrative workload.</li>\r\n<li>Enhanced training program efficiency and participant satisfaction.</li>\r\n</ul>', 'Broadcasting training agenda and registration system for k12 staff', 'https://workshopenrollment.appostrophi.com/', 2, 2, 1, 1, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(3, 'Inventory Management System', 'inventory-management-system', 'Puzzled overstock turns into predictable patterns. Guess how?', NULL, NULL, '78512555_inventory-projet-img.png', 'Objective', 'To transform the way institutions manage inventory by replacing manual asset tracking with fully digital processes.', 'Resolution', '<p>We Implemented an Inventory Management System that allowed schools to efficiently record, monitor, track and manage their assets with updates on stock levels, usage, and location.\r\n</p>', 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Tracking and reporting on each asset and reducing the loss of school property.</li>\r\n<li>Maintaining efficiency and extending the lifespan of key assets.</li>\r\n<li>Location and stock tracking significantly reduced incidents of misplaced items.</li>\r\n</ul>', 'Record keeping and tracking of school inventories. ', 'https://inventorymanagement.appostrophi.com/', 0, 4, NULL, NULL, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(4, 'Facility Rental Management System', 'facility-rental-management-system', 'Are you looking for facilities that run like clockwork?', '555888_FACILITY_RENTAL_MANAGEMENT_SYSTEM_FINAL_VIEDO.mp4', 'facility-img_01.png', '78512555_frms-img-project.png', 'Objective', 'A Rental Management system that addresses the need for management and monetizing of Idle Assets.', 'Resolution', '<p>We created an integrated facility management system that allows institutions to publish available assets available for rent. This system facilitates the booking process, eliminates manual intervention and errors. It provides real-time availability status, facilitating seamless asset allocation.</p>\r\n<ul class=\"reol-ul-sec\">\r\n<li><p><span class=\"case-left\">Asset Management:</span>\r\n<span class=\"case-right\">  Unified all institution’s assets into a cohesive, accessible platform, ensuring easy management.</span></p></li>\r\n\r\n<li><p><span class=\"case-left\">Process Automation:</span>\r\n<span class=\"case-right\"> Automated all aspects of the booking process, from availability checks to notifications, cutting down on human errors.</span></p></li>\r\n\r\n\r\n<li><p><span class=\"case-left\">Operational Efficiency:</span>\r\n<span class=\"case-right\">Streamlined the entire rental process by eliminating scheduling conflicts and ensuring accurate bookings.</span></p></li>\r\n</ul>', 'Outcome', '<ul  class=\"out-ul-sec\">\r\n\r\n<li>Add on revenue through effective renting of institution assets.</li>\r\n<li>Streamlined administrative booking tasks and significantly monetized assets</li>\r\n<li>Provided a superior user experience by simplifying the rental process.</li>\r\n<li>Optimized asset management, leading to more revenue growth.</li>\r\n</ul>', 'Managing Facility Rentals of Schools', 'https://facilityrental.appostrophi.com/', 3, 5, 1, 1, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(5, 'Student Transcript Application', 'student-transcript-application', 'Hassle-free your student records by archiving them. how?\r\n', '8555_STUDENT_TRANSCRIPT_APPLICATION_FINAL_VIDEO.mp4', 'student-transcript.png', '78512555_student-transcript_project-img.png', 'Objective', 'Formulate a resilient and accessible archival system that securely stores student academic records.', 'Resolution', '<p>We implemented advanced student transcript software (STS) designed to address the need for meticulous data preservation and accessibility to maintain detailed academic histories. This system securely archives detailed transcript data, offering students lifelong access to their academic records.</p>', 'Outcome', '\r\n<ul class=\"reol-ul-sec\">\r\n<li><p><span class=\"case-left\">Data Preservation:</span>\r\n<span class=\"case-right\">  Ensures the storage and printing of student academic records even decades after they have graduated.</span></p></li>\r\n\r\n<li><p><span class=\"case-left\">Data Security:</span>\r\n<span class=\"case-right\"> Utilizes advanced security measures to protect sensitive academic data from breaches and loss.</span></p></li>\r\n\r\n\r\n<li><p><span class=\"case-left\"> Permanent Record Access:</span>\r\n<span class=\"case-right\">Students can easily retrieve their transcripts and academic histories at any point, providing lifelong access.</span></p></li>\r\n<li><p><span class=\"case-left\"> Emotional Value:</span>\r\n<span class=\"case-right\">Strengthened alumni connections by preserving and providing access to their academic milestones.</span></p></li>\r\n\r\n\r\n\r\n</ul>', 'Repository for student lifetime marksheets ', 'https://studenttranscript.appostrophi.com/', 4, 3, 1, 1, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(6, 'OPRA Software', 'opra-software', NULL, NULL, NULL, '78512555_opra-project-img.png', 'Objective', 'To streamline and simplify the OPRA request process for K-12 schools, by digitizing the request-to-delivery system, ensuring timely delivery of public records.', 'Resolution', '<p>We developed a progressive software for facilitating OPRA requests, making the entire request-to-delivery process digital. It automated the tracking and management of requests with timely responses keeping the user experience smooth for both the requester and the custodian of records.</p>', 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>The new system significantly decreased the time required to process OPRA requests.</li>\r\n<li>Ensured full compliance with the OPRA statute, aligning with legal requirements for public records access.</li>\r\n<li>Improved communication and reduced administrative workload.</li>\r\n<li>The platform managed a high volume of OPRA requests within K-12 school districts, improving overall efficiency.</li>\r\n<li>Requesters benefit from notifications and status updates.</li>\r\n</ul>', 'Facilitating OPRA requests', 'https://opra.appostrophi.com', 0, 6, NULL, NULL, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(7, 'Absence Reporting Portal', 'absence-reporting-portal', NULL, NULL, NULL, '78512555_leave-projt-img.png', 'Objective', 'To formulate an absence reporting and leave management system for staff by enabling tracking of leave balances and streamlining the overall leave application and approval process.', 'Resolution', '<p>We developed a user-friendly absence reporting portal that also functions as a leave bank, where staff can view and manage their time-off allowances, track consumed and available leaves across different categories, and apply for accrued leaves. This system integrates with school operations to ensure smooth management of staff absences.</p>\r\n<ul class=\"reol-ul-sec\">\r\n<li><span class=\"case-left\">Leave Bank Integration:</span>\r\n<span class=\"case-right\">  Staff can easily track their available leaves under various heads ensuring they are well-informed of their leave status at all times.</span></li>\r\n\r\n<li><span class=\"case-left\">Digitized Leave Application:</span>\r\n<span class=\"case-right\">  Staff members can submit leave requests digitally, which are routed to the appropriate supervisors for approval.</span></li>\r\n\r\n\r\n</ul>', 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Staff members now have easy access to their leave credits, ensuring transparency and better planning of absences.</li>\r\n<li>Reduced irrelevant training sessions.</li>\r\n<li>Augmented absence request processing and approval workflows streamline the process for both staff and management.</li>\r\n<li>By ensuring tracking of absences, schools can better manage staffing needs, preventing disruptions.</li>\r\n</ul>', 'Leave Management System for staffs in K12 Schools ', 'https://leavemanagement.appostrophi.com/', 0, 9, NULL, NULL, '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(8, 'Household Survey Application', 'household-survey-application', NULL, NULL, NULL, '785455_houshold_project-img.png', 'Objective', 'To identify students eligible for free, subsidized, and paid meals in K-12 schools with equitable distribution of meal programs.', 'Resolution', '<p>We developed an household survey application. Parents participated in the survey over digital channel and were asked to submit income brackets to determine eligibility for meal programs for their children (free, subsidized, or paid). We ensured that data collection was secure, this new system ensured the eligibility process was transparent and helped getting more parents to participate in the survey.</p>\r\n\r\n<ul class=\"reol-ul-sec\">\r\n\r\n<li>Past responses are archived and can be recalled anytime for cross referencing.</li>\r\n\r\n\r\n</ul>', 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Manual intervention was no longer required as it  significantly reduced errors in determining student eligibility for meal programs.</li>\r\n<li>The system identified students, ensuring that those who were eligible for free and subsidized meals received them.</li>\r\n<li>Due to precise eligibility checks, food wastage was minimized, and meal programs saw increased efficiency</li>\r\n<li>Ensured the secure handling of sensitive family income information while complying with privacy standards.</li>\r\n</ul>', 'Acurrately identifies Free, Subsidized & Paid food eligible students in K12 schools', 'https://householdsurvey.appostrophi.com/', 0, 7, NULL, NULL, '2024-08-16 11:57:18', '2024-08-16 11:57:18', NULL),
(9, 'Athletic Participation Consent Form', 'athletic-participation-consent-form', NULL, NULL, NULL, '785455_athletic_project-img.png', 'Objective', 'To develop a secured digital consent platform for K -12 schools that collects and manages athletic participation consent forms for students joining athletic clubs.\r\n', 'Resolution', '\r\n<ul class=\"reol-ul-sec\">\r\n<li>We developed a digital consent platform to streamline the processes of collecting parental consent for student participation in school athletic programs.</li>\r\n\r\n<li>The system automates the previously manual process, ensuring that each student\'s forms are securely stored in a centralized system making them easy to retrieve and track over time.</li>\r\n\r\n</ul>', 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li> The system eliminates the need for physical storage and reduces the risk of lost forms, improving long-term documentation for compliance and audits.</li>\r\n<li>Coaches and school staff can easily retrieve required forms digitally, improving their ability to manage student eligibility timely.\r\n</li>\r\n<li>The manual process was replaced by an efficient digital solution and making it easier to track each student\'s participation status.</li>\r\n</ul>', 'Consent Platform for students to join various Sports Clubs in K12 School', NULL, 0, 8, NULL, NULL, '2024-08-16 11:57:18', '2024-08-16 11:57:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects_new`
--

CREATE TABLE `projects_new` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `video_image` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `first_title` varchar(255) DEFAULT NULL,
  `first_des` text DEFAULT NULL,
  `project_details_image` varchar(255) DEFAULT NULL,
  `project_video_thumbnail` varchar(255) DEFAULT NULL,
  `third_title` varchar(255) DEFAULT NULL,
  `third_des` text DEFAULT NULL,
  `short_de_pro` text DEFAULT NULL,
  `project_link` varchar(200) DEFAULT NULL,
  `home_seq` int(11) DEFAULT NULL,
  `pro_seq` int(11) DEFAULT NULL,
  `home_case` int(11) DEFAULT NULL,
  `pro_case` int(11) DEFAULT NULL,
  `project_status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects_new`
--

INSERT INTO `projects_new` (`id`, `title`, `slug`, `short_des`, `video`, `video_image`, `image`, `first_title`, `first_des`, `project_details_image`, `project_video_thumbnail`, `third_title`, `third_des`, `short_de_pro`, `project_link`, `home_seq`, `pro_seq`, `home_case`, `pro_case`, `project_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'E-form Approval and Routing System', 'e-form-approval-routing-system', 'Turbocharge paper trails into digital miles. how?', 'Watch_Video_Eform.mp4', '47555_video-img-sec.png', '78512555_project-img.jpg', NULL, NULL, NULL, NULL, 'Outcome', '<p>Zero Error and 100% uptime since going live in 2019</p>', 'Simplified ERP for K12 schools', 'https://actionform.appostrophi.com/', 1, 1, 1, 1, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(2, 'Workshop Management\r\nSystem', 'workshop-management-system', 'Believe there\'s no  easy way to manage workshops?', '785852_Workshop_Management_Video.mp4', 'workshop_video_thubmail.png', '78512555_workshop_img.jpg', NULL, NULL, NULL, NULL, 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Increased participation of relevant employees.</li>\r\n<li>Reduced irrelevant training sessions.</li>\r\n<li>Improved communication and reduced administrative workload.</li>\r\n<li>Enhanced training program efficiency and participant satisfaction.</li>\r\n</ul>', 'Broadcasting training agenda and registration system for k12 staff', 'https://workshopenrollment.appostrophi.com/', 2, 2, 1, 1, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(3, 'Inventory Management System', 'inventory-management-system', 'Puzzled overstock turns into predictable patterns. Guess how?', NULL, NULL, '78512555_inventory-projet-img.png', NULL, NULL, NULL, NULL, 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Tracking and reporting on each asset and reducing the loss of school property.</li>\r\n<li>Maintaining efficiency and extending the lifespan of key assets.</li>\r\n<li>Location and stock tracking significantly reduced incidents of misplaced items.</li>\r\n</ul>', 'Record keeping and tracking of school inventories. ', 'https://inventorymanagement.appostrophi.com/', 0, 4, NULL, NULL, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(4, 'Facility Rental Management System', 'facility-rental-management-system', 'Are you looking for facilities that run like clockwork?', '555888_FACILITY_RENTAL_MANAGEMENT_SYSTEM_FINAL_VIEDO.mp4', 'facility-img_01.png', '78512555_frms-img-project.png', NULL, NULL, NULL, NULL, 'Outcome', '<ul  class=\"out-ul-sec\">\r\n\r\n<li>Add on revenue through effective renting of institution assets.</li>\r\n<li>Streamlined administrative booking tasks and significantly monetized assets</li>\r\n<li>Provided a superior user experience by simplifying the rental process.</li>\r\n<li>Optimized asset management, leading to more revenue growth.</li>\r\n</ul>', 'Managing Facility Rentals of Schools', 'https://facilityrental.appostrophi.com/', 3, 5, 1, 1, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(5, 'Student Transcript Application', 'student-transcript-application', 'Hassle-free your student records by archiving them. how?\r\n', '8555_STUDENT_TRANSCRIPT_APPLICATION_FINAL_VIDEO.mp4', 'student-transcript.png', '78512555_student-transcript_project-img.png', NULL, NULL, NULL, NULL, 'Outcome', '\r\n<ul class=\"reol-ul-sec\">\r\n<li><p><span class=\"case-left\">Data Preservation:</span>\r\n<span class=\"case-right\">  Ensures the storage and printing of student academic records even decades after they have graduated.</span></p></li>\r\n\r\n<li><p><span class=\"case-left\">Data Security:</span>\r\n<span class=\"case-right\"> Utilizes advanced security measures to protect sensitive academic data from breaches and loss.</span></p></li>\r\n\r\n\r\n<li><p><span class=\"case-left\"> Permanent Record Access:</span>\r\n<span class=\"case-right\">Students can easily retrieve their transcripts and academic histories at any point, providing lifelong access.</span></p></li>\r\n<li><p><span class=\"case-left\"> Emotional Value:</span>\r\n<span class=\"case-right\">Strengthened alumni connections by preserving and providing access to their academic milestones.</span></p></li>\r\n\r\n\r\n\r\n</ul>', 'Repository for student lifetime marksheets ', 'https://studenttranscript.appostrophi.com/', 4, 3, 1, 1, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(6, 'OPRA Software', 'opra-software', NULL, NULL, NULL, '78512555_opra-project-img.png', NULL, NULL, NULL, NULL, 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>The new system significantly decreased the time required to process OPRA requests.</li>\r\n<li>Ensured full compliance with the OPRA statute, aligning with legal requirements for public records access.</li>\r\n<li>Improved communication and reduced administrative workload.</li>\r\n<li>The platform managed a high volume of OPRA requests within K-12 school districts, improving overall efficiency.</li>\r\n<li>Requesters benefit from notifications and status updates.</li>\r\n</ul>', 'Facilitating OPRA requests', 'https://opra.appostrophi.com', 0, 6, NULL, NULL, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(7, 'Absence Reporting Portal', 'absence-reporting-portal', NULL, NULL, NULL, '78512555_leave-projt-img.png', NULL, NULL, NULL, NULL, 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Staff members now have easy access to their leave credits, ensuring transparency and better planning of absences.</li>\r\n<li>Reduced irrelevant training sessions.</li>\r\n<li>Augmented absence request processing and approval workflows streamline the process for both staff and management.</li>\r\n<li>By ensuring tracking of absences, schools can better manage staffing needs, preventing disruptions.</li>\r\n</ul>', 'Leave Management System for staffs in K12 Schools ', 'https://leavemanagement.appostrophi.com/', 0, 9, NULL, NULL, 'active', '2024-08-16 05:57:18', '2024-08-16 05:57:18', NULL),
(8, 'Household Survey Application', 'household-survey-application', NULL, NULL, NULL, '785455_houshold_project-img.png', NULL, NULL, NULL, NULL, 'Outcome', '<ul class=\"out-ul-sec\">\r\n\r\n<li>Manual intervention was no longer required as it  significantly reduced errors in determining student eligibility for meal programs.</li>\r\n<li>The system identified students, ensuring that those who were eligible for free and subsidized meals received them.</li>\r\n<li>Due to precise eligibility checks, food wastage was minimized, and meal programs saw increased efficiency</li>\r\n<li>Ensured the secure handling of sensitive family income information while complying with privacy standards.</li>\r\n</ul>', 'Acurrately identifies Free, Subsidized & Paid food eligible students in K12 schools', 'https://householdsurvey.appostrophi.com/', 0, 7, NULL, NULL, 'active', '2024-08-16 11:57:18', '2024-08-16 11:57:18', NULL),
(9, 'Athletic Participation Consent Form', 'athletic-participation-consent-form', 'Athletic Participation Consent Form', '1730313574902autologout.mp4', '1730313985521Screenshot.png', '785455_athletic_project-img.png', 'Athletic Participation Consent Form', '<ul class=\"out-ul-sec\">\r\n\r\n<li> The system eliminates the need for physical storage and reduces the risk of lost forms, improving long-term documentation for compliance and audits.</li>\r\n<li>Coaches and school staff can easily retrieve required forms digitally, improving their ability to manage student eligibility timely.\r\n</li>\r\n<li>The manual process was replaced by an efficient digital solution and making it easier to track each student\'s participation status.</li>\r\n</ul>', '1730438018723history table.png', '1730791671375fluce 119.png', 'Outcome', '<ul class=\"out-ul-sec\">\n\n<li> The system eliminates the need for physical storage and reduces the risk of lost forms, improving long-term documentation for compliance and audits.</li>\n<li>Coaches and school staff can easily retrieve required forms digitally, improving their ability to manage student eligibility timely.\n</li>\n<li>The manual process was replaced by an efficient digital solution and making it easier to track each student\'s participation status.</li>\n</ul>', 'Consent Platform for students to join various Sports Clubs in K12 School', NULL, 0, 8, NULL, NULL, 'active', '2024-08-16 11:57:18', '2024-08-16 11:57:18', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `servicebanner`
--

CREATE TABLE `servicebanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicebanner`
--

INSERT INTO `servicebanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_services-banner.jpg', '78512555services.jpg', 'Services', 'Services We Render', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `servicebanner_new`
--

CREATE TABLE `servicebanner_new` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicebanner_new`
--

INSERT INTO `servicebanner_new` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78512555_services-banner.jpg', '78512555services.jpg', 'Our Services', 'Services We Render', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `servicepagedetails`
--

CREATE TABLE `servicepagedetails` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicepagedetails`
--

INSERT INTO `servicepagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Discover and learn more about our comprehensive services', NULL, NULL, NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `servicepagedetails_new`
--

CREATE TABLE `servicepagedetails_new` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` text DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicepagedetails_new`
--

INSERT INTO `servicepagedetails_new` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Discover and learn more about our comprehensive services', NULL, NULL, NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `servicepageseotag`
--

CREATE TABLE `servicepageseotag` (
  `id` int(11) NOT NULL,
  `page_name` varchar(255) DEFAULT NULL,
  `meta_title` text DEFAULT NULL,
  `meta_key` text DEFAULT NULL,
  `meta_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicepageseotag`
--

INSERT INTO `servicepageseotag` (`id`, `page_name`, `meta_title`, `meta_key`, `meta_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '4', 'Gap ', 'anlysis2', 'anlysis1', '2024-11-05 12:39:25', '2024-11-05 12:39:25', NULL),
(2, '3', 'auit', 'auit', 'auit', '2024-11-05 12:39:59', '2024-11-05 12:39:59', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `first_image` varchar(255) DEFAULT NULL,
  `first_title` varchar(255) DEFAULT NULL,
  `first_des` text DEFAULT NULL,
  `second_image` varchar(255) DEFAULT NULL,
  `second_title` varchar(255) DEFAULT NULL,
  `short_title_one` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `short_title_two` varchar(255) DEFAULT NULL,
  `short_des_two` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`id`, `image`, `title`, `slug`, `banner_title`, `banner_image`, `first_image`, `first_title`, `first_des`, `second_image`, `second_title`, `short_title_one`, `short_des`, `short_title_two`, `short_des_two`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '785125899_workflow_auto_img.png', 'Workflow Management & Automation', 'workflow-management-automation', 'Workflow Management', '78512555_Workflow-Management-banner.jpg', '745422_workflow-new.png', 'Our workflow management transforms your intricate operations digitally with ease from start to finish.', 'Its Importance', '78512555_gap-benefits-img.png', 'Where your workflows span multiple departments and involve manual handoffs, \r\n                            our service enhances operational flow within them by improving communication and accountability at every step and reducing the likelihood of errors.', 'It’s Benefits', ' <ul>\r\n                            <li>Consistency and Accuracy</li>\r\n                            <p> Ensure that each step of the workflow is handled correctly, with less variability and fewer errors.</p>\r\n                            <li>Improved Communication</li>\r\n                            <p> Facilitate better coordination within the institution by ensuring that information flows smoothly and reliably.</p>\r\n                            <li>Scalable Growth</li>\r\n                            <p> Builds workflows that grow with you, ensuring your processes remain progressive.</p>\r\n                        </ul>', '5555_Workflow-Management.jpg', NULL, '2024-08-16 05:31:54', '2024-08-16 05:31:54', NULL),
(2, '785125899_gap-analysis_img.png', 'Gap Analysis', 'gap-analysis', 'Gap Analysis', '78512555_gap-analisys-banner.jpg', '78512555_gap-import.png', 'We collaborate closely with your institution to systematically evaluate and streamline your workflows. By identifying nuanced areas, we deliver tailored solutions that transform manual processes into efficient, automated systems, further enhancing account', 'Its Importance', '78512555_gap-benefits-img.png', 'Our service ensures that your institution not only keeps pace but excels by adopting smarter, faster, and more reliable processes. By addressing certain gaps in your current workflows, we help create smoother processes and improve the overall effectivenes', 'It’s Benefits', '  <ul>\r\n                            <li>Enhanced accountability</li>\r\n                            <p> Implement systems that make every action traceable, ensuring that responsibilities are clear and errors are minimized.</p>\r\n                            <li>Scalability</li>\r\n                            <p> Create processes that not only solve today’s problems but also adapt to tomorrow’s challenges.</p>\r\n                            <li>Custom Solutions</li>\r\n                            <p>  Every solution is customized to meet the unique demands of your institution, ensuring that the changes we implement truly make a difference.</p>\r\n                        </ul>', '855855_gap-analisys.jpg', NULL, '2024-08-16 05:31:54', '2024-08-16 05:31:54', NULL),
(3, '785125899_efficency_img.png', 'Efficiency Audit', 'efficiency-audit', '\r\nEfficiency Audit', '78512555_Efficiency-Audit-banner.jpg', '78512555_efficency_audit_new.png', 'We refine your existing processes for efficiency \r\n                            by identifying clear opportunities and providing an automated strategy and roadmap to ensure minimal interruption across all systems.', 'Its Importance', '78512555_gap-benefits-img.png', 'Our audit identifies where your institution\'s few processes can transform. By conducting the audit, we ensure that the workflows are responsive and resilient.', 'It’s Benefits', ' <ul>\r\n                            <li>Improved Workflow Visibility</li>\r\n                            <p>  Clear, automated workflows reduce the complexity of day-to-day operations.</p>\r\n                            <li>Enhanced Collaboration</li>\r\n                            <p> Improved communication and collaboration across departments,</p>\r\n                            <li>Future-Ready Processes</li>\r\n                            <p>  Scalability built into the new workflows ensures your institution\'s long-term success.</p>\r\n                        </ul>', '78558555_Efficiency-Audit.jpg', NULL, '2024-08-16 05:31:54', '2024-08-16 05:31:54', NULL),
(4, '785125899_programming_img.png', 'Programming', 'programming', 'Programming', '78512555_programming-banner.jpg', '78512555_programming_img-new.png', 'Programming', 'Our team of skilled developers crafts custom software solutions that perfectly align with your digital transformation journey.', NULL, NULL, NULL, NULL, '855552_programming.jpg', NULL, '2024-08-16 05:31:54', '2024-08-16 05:31:54', NULL),
(5, '785125899_njsmart_img.png', 'NJSMART & NJDOE Data collection support & Management.', 'njsmart-njdoe-data-collection-support-management', 'New Jersey Data Submission', '78512555_inner-banner-v-news.jpg', '78512555_data-base.png', 'We streamline your district\'s data submissions across multiple platforms required by the New Jersey Department of Education (DOE). We oversee the critical processes involved in NJ SMART and NJ Homeroom for academic data management, NJ institution maintain', 'Its Importance', '78512555_gap-benefits-img.png', 'We understand the importance of the timely submission of accurate data. We make sure you avoid shortfalls and potential legal risks by maintaining compliance with state regulations and QSAC standards. ', 'It’s Benefits', '               <ul>\r\n                            <li>Accurate Data Management</li>\r\n                            <p>Ensure compliance with NJ SMART and NJ Homeroom, maintaining up-to-date and precise educational records.</p>\r\n                            <li>Secured State Funding</li>\r\n                            <p> Guarantee accurate NJ ASSA reporting to secure the necessary funding for your district, particularly for supporting low-income students.</p>\r\n                            <li>Legal Compliance</li>\r\n                            <p>   Maintain compliance with NJ Department of Labor regulations, protecting your institution from legal risks.</p>\r\n                        </ul>', '55555_inner-mobile-banner.jpg', NULL, '2024-08-16 05:31:54', '2024-08-16 05:31:54', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sliders`
--

CREATE TABLE `sliders` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `mobile_image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `short_desnew` text DEFAULT NULL,
  `slider_status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sliders`
--

INSERT INTO `sliders` (`id`, `image`, `mobile_image`, `title`, `subtitle`, `short_des`, `short_desnew`, `slider_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '7851255567_banner-img.png', '78512555_home-slider.jpg', 'We Automate', 'You Accelerate', 'Step Into A World Defined By', 'Automation, With Workflows Engineered By You.', 'active', '2024-08-16 04:50:46', '2024-08-16 04:50:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sliders_new`
--

CREATE TABLE `sliders_new` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `mobile_image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `subtitle` varchar(255) DEFAULT NULL,
  `short_des` text DEFAULT NULL,
  `short_desnew` text DEFAULT NULL,
  `slider_status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sliders_new`
--

INSERT INTO `sliders_new` (`id`, `image`, `mobile_image`, `title`, `subtitle`, `short_des`, `short_desnew`, `slider_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '7851255567_banner-img.png', '78512555_home-slider.jpg', 'We Automate', 'You Accelerate', 'Step Into A World Defined By', 'Automation, With Workflows Engineered By You.', 'active', '2024-08-16 04:50:46', '2024-08-16 04:50:46', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `team`
--

CREATE TABLE `team` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `mobile_image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `face_url` text DEFAULT NULL,
  `twitter_url` text DEFAULT NULL,
  `team_status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `team`
--

INSERT INTO `team` (`id`, `image`, `mobile_image`, `name`, `designation`, `face_url`, `twitter_url`, `team_status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '7851255567_banner-img.png', '78512555_home-slider.jpg', 'We Automate', 'You Accelerate', 'Step Into A World Defined By', 'Automation, With Workflows Engineered By You.', 'active', '2024-08-16 04:50:46', '2024-08-16 04:50:46', '2024-11-05 08:16:13'),
(2, '1730794768631history table.png', NULL, 'Mr. Singh', 'Devloper', 'https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F', 'https://x.com/?lang=en', 'active', '2024-11-05 08:19:30', '2024-11-05 08:19:30', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `teamdetails_new`
--

CREATE TABLE `teamdetails_new` (
  `id` int(11) NOT NULL,
  `page_title` varchar(255) DEFAULT NULL,
  `page_des` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `teamdetails_new`
--

INSERT INTO `teamdetails_new` (`id`, `page_title`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Our Fantastic Team', 'Our journey has continuously evolved over 12 years, driven by a simple yet profound mission crafted with precision and purpose, fueling your success in the digital realm.', '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `termsbanner`
--

CREATE TABLE `termsbanner` (
  `id` int(11) NOT NULL,
  `banner_image` varchar(255) DEFAULT NULL,
  `banner_mobile_image` varchar(200) DEFAULT NULL,
  `banner_title` varchar(255) DEFAULT NULL,
  `banner_title_short` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `termsbanner`
--

INSERT INTO `termsbanner` (`id`, `banner_image`, `banner_mobile_image`, `banner_title`, `banner_title_short`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '78555_terms-and-condition.jpg', '555555_terms-and-condition-mobile.jpg', 'Terms & Conditions', 'Transparency in Every Click', '2024-08-16 06:40:48', '2024-08-16 06:40:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `termspagedetails`
--

CREATE TABLE `termspagedetails` (
  `id` int(11) NOT NULL,
  `page_title` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `page_short_des` longtext DEFAULT NULL,
  `page_des` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `termspagedetails`
--

INSERT INTO `termspagedetails` (`id`, `page_title`, `image`, `page_short_des`, `page_des`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '<div class=\'privacy-inner\'>\r\n  <p>Please read these terms and conditions carefully before using Our Service.\r\n  </p>\r\n  <div class=\'privcy-head-sec\'>\r\n  <h2>Interpretation and Definitions</h2>\r\n  <h3>Interpretation</h3>\r\n  <p>The words of which the initial letter is capitalized have meanings defined under the following conditions. \r\n      The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.</p>\r\n\r\n      <h4>Definitions</h4>\r\n      <p>For the purposes of these Terms and Conditions:</p>\r\n      <p><span class=\'bold-sec\'>Affiliate </span> \r\n      means an entity that controls, is controlled by or is under common control with a party, where \"control\" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</p>\r\n      <p><span class=\'bold-sec\'>Country </span> \r\n      refers to: New Jersey, United States\r\n      </p>\r\n\r\n      <p><span class=\'bold-sec\'>Company </span> \r\n      (referred to as either \"the Company\", \"We\", \"Us\" or \"Our\" in this Agreement) refers to Appostrophi, USA.\r\n      </p>\r\n      <p><span class=\'bold-sec\'>Device </span> \r\n      means any device that can access the Service such as a computer, a cellphone or a digital tablet.\r\n      </p>\r\n      <p><span class=\'bold-sec\'>Service</span> \r\n      refers to the Website\r\n      </p>\r\n\r\n      <p><span class=\'bold-sec\'>Terms and Conditions</span> \r\n      (also referred as \"Terms\") mean these Terms and Conditions that form the entire agreement between You and the Company regarding the use of the Service.\r\n      </p>\r\n\r\n      <p><span class=\'bold-sec\'>Third-party Social Media Service</span>   \r\n        means any services or content (including data, information, products or services) provided by a third-party that may be displayed, included or made available by the Service.\r\n\r\n      </p>\r\n\r\n      <p><span class=\'bold-sec\'>Website</span> refers to Appostrophi, accessible from <a class=\"link-color\" href=\"https://www.appostrophi.com/\">https://appostrophi.com/</a></p>\r\n      <p><span class=\'bold-sec\'>You </span> \r\n      means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable\r\n      </p>\r\n  </div>\r\n  <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Acknowledgment</h2>\r\n      <p>These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.</p>\r\n     \r\n     <p>Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.</p>\r\n     <p>By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.</p>\r\n     <p>You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.</p>\r\n      <p>Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.</p>\r\n      </div>\r\n      <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Links to Other Websites</h2>\r\n      <p>Our Service may contain links to third-party web sites or services that are not owned or controlled by the Company.\r\n      </p>\r\n      <p>The Company has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third party web sites or services. You further acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.\r\n      </p>\r\n      <p>We strongly advise You to read the terms and conditions and privacy policies of any third-party web sites or services that You visit.\r\n      </p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Termination</h2>\r\n      <p>We may terminate or suspend Your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if You breach these Terms and Conditions. </p>\r\n      <p>Upon termination, Your right to use the Service will cease immediately. </p>\r\n    \r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Limitation of Liability</h2>\r\n      <p>Notwithstanding any damages that You might incur, the entire liability of the Company and any of its suppliers under any provision of this Terms and Your exclusive remedy for all of the foregoing shall be limited to the amount actually paid by You through the Service or 100 USD if You haven\'t purchased anything through the Service.</p>\r\n      <p>To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect, or consequential damages whatsoever (including, but not limited to, damages for loss of profits, loss of data or other information, for business interruption, for personal injury, loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software and/or third-party hardware used with the Service, or otherwise in connection with any provision of this Terms), even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.</p>\r\n    <p>Some states do not allow the exclusion of implied warranties or limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In these states, each party\'s liability will be limited to the greatest extent permitted by law.</p>\r\n     </div>\r\n\r\n     \r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>\"AS IS\" and \"AS AVAILABLE\" Disclaimer                                </h2>\r\n      <p>The Service is provided to You \"AS IS\" and \"AS AVAILABLE\" and with all faults and defects without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice. Without limitation to the foregoing, the Company provides no warranty or undertaking, and makes no representation of any kind that the Service will meet Your requirements, achieve any intended results, be compatible or work with any other software, applications, systems or services, operate without interruption, meet any performance or reliability standards or be error free or that any errors or defects can or will be corrected.</p>\r\n      <p>Without limiting the foregoing, neither the Company nor any of the company\'s provider makes any representation or warranty of any kind, express or implied: (i) as to the operation or availability of the Service, or the information, content, and materials or products included thereon; (ii) that the Service will be uninterrupted or error-free; (iii) as to the accuracy, reliability, or currency of any information or content provided through the Service; or (iv) that the Service, its servers, the content, or e-mails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.</p>\r\n    <p>Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on applicable statutory rights of a consumer, so some or all of the above exclusions and limitations may not apply to You. But in such a case the exclusions and limitations set forth in this section shall be applied to the greatest extent enforceable under applicable law.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Governing Law</h2>\r\n      <p>The laws of the Country, excluding its conflicts of law rules, shall govern this Terms and Your use of the Service. Your use of the Application may also be subject to other local, state, national, or international laws.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Disputes Resolution</h2>\r\n      <p>If You have any concern or dispute about the Service, You agree to first try to resolve the dispute informally by contacting the Company.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>For European Union (EU) Users</h2>\r\n      <p>If You are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which You are resident.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>United States Legal Compliance</h2>\r\n      <p>You represent and warrant that (i) You are not located in a country that is subject to the United States government embargo, or that has been designated by the United States government as a \"terrorist supporting\" country, and (ii) You are not listed on any United States government list of prohibited or restricted parties.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n          <h2 class=\'after-head\'>Severability and Waiver</h2>\r\n          <h3>Severability</h3>\r\n          <p>If any provision of these Terms is held to be unenforceable or invalid, such provision will be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law and the remaining provisions will continue in full force and effect.</p>\r\n\r\n          <h3>Waiver</h3>\r\n          <p>Except as provided herein, the failure to exercise a right or to require performance of an obligation under these Terms shall not affect a party\'s ability to exercise such right or require such performance at any time thereafter nor shall the waiver of a breach constitute a waiver of any subsequent breach.</p>\r\n\r\n  </div>\r\n\r\n  \r\n  <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Translation Interpretation</h2>\r\n      <p>These Terms and Conditions may have been translated if We have made them available to You on our Service. You agree that the original English text shall prevail in the case of a dispute.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec\'>\r\n      <h2 class=\'after-head\'>Changes to These Terms and Conditions</h2>\r\n      <p>We reserve the right, at Our sole discretion, to modify or replace these Terms at any time. If a revision is material We will make reasonable efforts to provide at least 30 days\' notice prior to any new terms taking effect. What constitutes a material change will be determined at Our sole discretion.</p>\r\n      <p>By continuing to access or use Our Service after those revisions become effective, You agree to be bound by the revised terms. If You do not agree to the new terms, in whole or in part, please stop using the website and the Service.</p>\r\n     </div>\r\n\r\n     <div class=\'privcy-head-sec another-new\'>\r\n  <h2 class=\'after-head\'>Contact Us</h2>\r\n  <p>\r\n  If you have any questions about these Terms and Conditions, You can contact us:\r\n\r\n  </p>\r\n  <p> By visiting this page on our website: <a class=\"link-color\" href=\"https://www.appostrophi.com/contact\">https://appostrophi.com/contact</a>\r\n  </p>\r\n    </div> \r\n\r\n  </div>', '789525252_our-expert_img.png', NULL, NULL, '2024-08-16 06:41:45', '2024-08-16 06:41:45', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'admin@gmail.com', '$2a$10$LxNEWC7ZJMCkD6WBSdukAOjD6WmB7ks20MPuZecQBoRq9w79n31jO', '2024-08-09 11:19:43', '2024-08-09 11:19:43', NULL),
(2, 'test@gmail.com', '$2a$10$bDQtWe3O2DcbrLz7UOvtpuXqSJt7ciRZesQ.KRiIf7pI2m9YtVIeq', '2024-08-09 11:42:32', '2024-08-09 11:42:32', NULL),
(3, 'testdd@gmail.com', '$2a$10$JrLDc8ZgtiHsYkZvuK7a0OxgPriBC4VogPld4uY35BobyIVNY4jfi', '2024-08-12 07:03:59', '2024-08-12 07:03:59', NULL),
(4, 'teskktdd@gmail.com', '$2a$10$Hd/JaOZ9qZ26rvvwwYjFXeKoMs12ya0XdClOcEoiA3GEBHlULYxMu', '2024-08-12 07:05:21', '2024-08-12 07:05:21', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `widget`
--

CREATE TABLE `widget` (
  `id` int(11) NOT NULL,
  `header_logo` varchar(255) DEFAULT NULL,
  `footer_logo` varchar(255) DEFAULT NULL,
  `short_desc` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `widget`
--

INSERT INTO `widget` (`id`, `header_logo`, `footer_logo`, `short_desc`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '1730284809763history table.png', '1730456905533Screenshot.png', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500', '2024-10-30 10:35:35', '2024-10-30 10:35:35', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `workwithus`
--

CREATE TABLE `workwithus` (
  `id` int(11) NOT NULL,
  `service_id` int(11) DEFAULT NULL,
  `image` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `short_desc` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `workwithus`
--

INSERT INTO `workwithus` (`id`, `service_id`, `image`, `title`, `short_desc`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '1730284534133history table.png', 'fgvfd', 'fgvg', '2024-10-30 10:35:35', '2024-10-30 10:35:35', NULL),
(2, 1, '1730284653183Screenshot.png', 'degfv', 'dgtdfbh', '2024-10-30 10:37:34', '2024-10-30 10:37:34', NULL),
(3, 4, '1730284809763history table.png', 'vbgcv', 'bgvn', '2024-10-30 10:40:11', '2024-10-30 10:40:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `aboutbanner`
--
ALTER TABLE `aboutbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aboutbanner_new`
--
ALTER TABLE `aboutbanner_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aboutpagedetails`
--
ALTER TABLE `aboutpagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aboutpagedetails_new`
--
ALTER TABLE `aboutpagedetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `aboutteamdetails`
--
ALTER TABLE `aboutteamdetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogbanner`
--
ALTER TABLE `blogbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogcategory`
--
ALTER TABLE `blogcategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogpageseotag`
--
ALTER TABLE `blogpageseotag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blogtitles`
--
ALTER TABLE `blogtitles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careerbanner`
--
ALTER TABLE `careerbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careerbanner_new`
--
ALTER TABLE `careerbanner_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careerdetails_new`
--
ALTER TABLE `careerdetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careerpagedetails`
--
ALTER TABLE `careerpagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers`
--
ALTER TABLE `careers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `careers_new`
--
ALTER TABLE `careers_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `casestudiesbanner`
--
ALTER TABLE `casestudiesbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `casestudiesbanner_new`
--
ALTER TABLE `casestudiesbanner_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `casestudiespagedetails`
--
ALTER TABLE `casestudiespagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `casestudiespagedetails_new`
--
ALTER TABLE `casestudiespagedetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `connects`
--
ALTER TABLE `connects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactpagedetails`
--
ALTER TABLE `contactpagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactpagedetails_new`
--
ALTER TABLE `contactpagedetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactsbanner`
--
ALTER TABLE `contactsbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contactsbanner_new`
--
ALTER TABLE `contactsbanner_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homepagetitle`
--
ALTER TABLE `homepagetitle`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homepartners`
--
ALTER TABLE `homepartners`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homepartners_new`
--
ALTER TABLE `homepartners_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homeservies`
--
ALTER TABLE `homeservies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homeservies_new`
--
ALTER TABLE `homeservies_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `hometitles`
--
ALTER TABLE `hometitles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homeuniques`
--
ALTER TABLE `homeuniques`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homeuniques_new`
--
ALTER TABLE `homeuniques_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homevisision`
--
ALTER TABLE `homevisision`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `homevisision_new`
--
ALTER TABLE `homevisision_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pageseotag`
--
ALTER TABLE `pageseotag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privacybanner`
--
ALTER TABLE `privacybanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `privacypagedetails`
--
ALTER TABLE `privacypagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectbanner`
--
ALTER TABLE `projectbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectbanner_new`
--
ALTER TABLE `projectbanner_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectpagedetails`
--
ALTER TABLE `projectpagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectpagedetails_new`
--
ALTER TABLE `projectpagedetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projectpageseotag`
--
ALTER TABLE `projectpageseotag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects_new`
--
ALTER TABLE `projects_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicebanner`
--
ALTER TABLE `servicebanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicebanner_new`
--
ALTER TABLE `servicebanner_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicepagedetails`
--
ALTER TABLE `servicepagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicepagedetails_new`
--
ALTER TABLE `servicepagedetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicepageseotag`
--
ALTER TABLE `servicepageseotag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders`
--
ALTER TABLE `sliders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sliders_new`
--
ALTER TABLE `sliders_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teamdetails_new`
--
ALTER TABLE `teamdetails_new`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `termsbanner`
--
ALTER TABLE `termsbanner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `termspagedetails`
--
ALTER TABLE `termspagedetails`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `widget`
--
ALTER TABLE `widget`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workwithus`
--
ALTER TABLE `workwithus`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `aboutbanner`
--
ALTER TABLE `aboutbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aboutbanner_new`
--
ALTER TABLE `aboutbanner_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aboutpagedetails`
--
ALTER TABLE `aboutpagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aboutpagedetails_new`
--
ALTER TABLE `aboutpagedetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aboutteamdetails`
--
ALTER TABLE `aboutteamdetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `application`
--
ALTER TABLE `application`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogbanner`
--
ALTER TABLE `blogbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogcategory`
--
ALTER TABLE `blogcategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `blogpageseotag`
--
ALTER TABLE `blogpageseotag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blogtitles`
--
ALTER TABLE `blogtitles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `careerbanner`
--
ALTER TABLE `careerbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `careerbanner_new`
--
ALTER TABLE `careerbanner_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `careerdetails_new`
--
ALTER TABLE `careerdetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `careerpagedetails`
--
ALTER TABLE `careerpagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `careers`
--
ALTER TABLE `careers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `careers_new`
--
ALTER TABLE `careers_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `casestudiesbanner`
--
ALTER TABLE `casestudiesbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `casestudiesbanner_new`
--
ALTER TABLE `casestudiesbanner_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `casestudiespagedetails`
--
ALTER TABLE `casestudiespagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `casestudiespagedetails_new`
--
ALTER TABLE `casestudiespagedetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `connects`
--
ALTER TABLE `connects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `contactpagedetails`
--
ALTER TABLE `contactpagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contactpagedetails_new`
--
ALTER TABLE `contactpagedetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `contactsbanner`
--
ALTER TABLE `contactsbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contactsbanner_new`
--
ALTER TABLE `contactsbanner_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homepagetitle`
--
ALTER TABLE `homepagetitle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homepartners`
--
ALTER TABLE `homepartners`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homepartners_new`
--
ALTER TABLE `homepartners_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homeservies`
--
ALTER TABLE `homeservies`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `homeservies_new`
--
ALTER TABLE `homeservies_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `hometitles`
--
ALTER TABLE `hometitles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homeuniques`
--
ALTER TABLE `homeuniques`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homeuniques_new`
--
ALTER TABLE `homeuniques_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homevisision`
--
ALTER TABLE `homevisision`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `homevisision_new`
--
ALTER TABLE `homevisision_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `pageseotag`
--
ALTER TABLE `pageseotag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `privacybanner`
--
ALTER TABLE `privacybanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `privacypagedetails`
--
ALTER TABLE `privacypagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projectbanner`
--
ALTER TABLE `projectbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projectbanner_new`
--
ALTER TABLE `projectbanner_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projectpagedetails`
--
ALTER TABLE `projectpagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projectpagedetails_new`
--
ALTER TABLE `projectpagedetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projectpageseotag`
--
ALTER TABLE `projectpageseotag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `projects_new`
--
ALTER TABLE `projects_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `servicebanner`
--
ALTER TABLE `servicebanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `servicebanner_new`
--
ALTER TABLE `servicebanner_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `servicepagedetails`
--
ALTER TABLE `servicepagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `servicepagedetails_new`
--
ALTER TABLE `servicepagedetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `servicepageseotag`
--
ALTER TABLE `servicepageseotag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sliders`
--
ALTER TABLE `sliders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sliders_new`
--
ALTER TABLE `sliders_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `teamdetails_new`
--
ALTER TABLE `teamdetails_new`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `termsbanner`
--
ALTER TABLE `termsbanner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `termspagedetails`
--
ALTER TABLE `termspagedetails`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `widget`
--
ALTER TABLE `widget`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `workwithus`
--
ALTER TABLE `workwithus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
