import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaHeadset, FaPencilRuler, FaCode, FaTools, FaCog } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import React, { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HeroSection = styled.div`
  position: relative;
  min-height: 120vh;
  background: linear-gradient(165deg, 
    rgba(37, 99, 235, 0.95) 0%, 
    rgba(37, 99, 235, 0.4) 25%, 
    rgba(0, 0, 0, 0) 50%),
    url('src/assets/img/audio/audiovideomain.webp');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  image-rendering: -webkit-optimize-contrast;
  image-rendering: pixelated;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  transform: translate3d(0,0,0);
  will-change: transform;
  display: flex;
  align-items: center;
  padding: 0;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url('src/assets/img/audio/audiovideomain.webp');
    background-size: cover;
    background-position: center;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  &.loaded::before {
    opacity: 1;
  }

  @media (min-width: 1920px) {
    background-image: linear-gradient(165deg, 
      rgba(37, 99, 235, 0.95) 0%, 
      rgba(37, 99, 235, 0.4) 25%, 
      rgba(0, 0, 0, 0) 50%),
      url('src/assets/img/audio/audiovideomain-4k.webp');
  }

  @media (min-resolution: 192dpi) {
    background-image: linear-gradient(165deg, 
      rgba(37, 99, 235, 0.95) 0%, 
      rgba(37, 99, 235, 0.4) 25%, 
      rgba(0, 0, 0, 0) 50%),
      url('src/assets/img/audio/audiovideomain-full@2x.webp');
  }

  @media (min-width: 2000px) {
    background-image: linear-gradient(165deg, 
      rgba(37, 99, 235, 0.95) 0%, 
      rgba(37, 99, 235, 0.4) 25%, 
      rgba(0, 0, 0, 0) 50%),
      url('src/assets/img/audio/audiovideomain-full@3x.webp');
  }
`;

// Create these image versions using Sharp or similar tool:
// 1. audiovideomain-compressed.webp (1440x960, quality: 60)
// 2. audiovideomain-full.webp (2880x1920, quality: 90)
// 3. audiovideomain-full@2x.webp (3840x2560, quality: 90)
// 4. audiovideomain-full@3x.webp (5760x3840, quality: 90)

// Command to generate images using Sharp:
/*
npm install sharp
npx sharp input.jpg -o audiovideomain-compressed.webp -q 60 -w 1440
npx sharp input.jpg -o audiovideomain-full.webp -q 90 -w 2880
npx sharp input.jpg -o audiovideomain-full@2x.webp -q 90 -w 3840
npx sharp input.jpg -o audiovideomain-full@3x.webp -q 90 -w 5760
*/

const HeroContent = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 1400px;
  margin: 0;
  padding-left: 5%;
  z-index: 10;
  
  @media (max-width: 1200px) {
    padding-left: 6%;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
    text-align: center;
  }
`;

const MainHeading = styled.span`
  display: block;
  font-size: 0.875rem;
  color: #1a237e;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 500;
  position: relative;
  padding-left: 45px;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    width: 30px;
    height: 1px;
    background: linear-gradient(90deg, #1a237e, transparent);
    transform: scaleX(0);
    animation: lineGrow 0.8s ease-out 0.5s forwards;
  }
  
  @keyframes lineGrow {
    to { transform: scaleX(1); }
  }
  
  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding-left: 0;
    margin-bottom: 0.5rem;
    
    &:before {
      display: none;
    }
  }
`;

const SubHeading = styled.span`
  display: block;
  font-size: 3.5rem;
  font-weight: 500;
  color: #1a237e;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  max-width: 600px;
  background: linear-gradient(120deg, #1a237e, #2b4162);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: #2b4162;
  margin: 1.5rem 0 2.5rem;
  max-width: 450px;
  line-height: 1.6;
  font-weight: 400;
  letter-spacing: 0.2px;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.3s forwards;
  
  @media (max-width: 768px) {
    font-size: 0.9rem;
    margin: 1rem auto 2rem;
    text-align: center;
  }
`;

const CtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 0.9rem 2.5rem;
  background-color: transparent;
  border: 1px solid #60a5fa;
  color: #60a5fa;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(96, 165, 250, 0.1);
    transform: skewX(-20deg);
    transition: 0.5s;
  }
  
  &:hover:before {
    left: 100%;
  }
  
  &:hover {
    background-color: #60a5fa;
    color: #ffffff;
    box-shadow: 0 5px 15px rgba(96, 165, 250, 0.3);
    transform: translateY(-2px);
  }

  &:after {
    content: '→';
    margin-left: 1rem;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: translateX(5px);
  }
`;

const ContentSection = styled.section`
  padding: 6rem 0;
  background: #f8faff;
  
  @media (max-width: 768px) {
    padding: 3rem 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5%;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    padding: 0 1.5rem;
  }
`;

const TextContent = styled.div`
  h2 {
    color: #60a5fa;
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 600;
    
    @media (max-width: 768px) {
      font-size: 1.8rem;
      text-align: center;
    }
  }
  
  p {
    color: #64748b;
    font-size: 1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    h2 {
      font-size: 1.8rem;
      text-align: center;
    }
    
    p {
      font-size: 0.9rem;
      text-align: center;
    }
  }
`;

const Image = styled.img.attrs({
  loading: 'lazy',
})`
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
`;

const ServicesSection = styled.section`
  padding: 6rem 5%;
  background: #fafcff;
  text-align: center;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const SectionTitle = styled.h2`
  color: #60a5fa;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  text-align: center;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ServiceCard = memo(styled.div`
  background: #ffffff;
  padding: 2rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(96, 165, 250, 0.05);
  transition: transform 0.3s ease;
  border: 1px solid rgba(96, 165, 250, 0.08);
  
  &:hover {
    background: #fafcff;
    box-shadow: 0 15px 35px rgba(96, 165, 250, 0.08);
  }
  
  svg {
    font-size: 2.5rem;
    color: #60a5fa;
    margin-bottom: 1.5rem;
  }
  
  h3 {
    color: #60a5fa;
    font-size: 1.2rem;
    margin-bottom: 1rem;
    font-weight: 600;
  }
  
  p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    
    svg {
      font-size: 2rem;
    }
    
    h3 {
      font-size: 1.1rem;
    }
    
    p {
      font-size: 0.85rem;
    }
  }
`);

const SolutionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 0;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 2rem 1.5rem;
  }
`;

const SolutionCard = styled.div`
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.05);
  transition: all 0.3s ease;
  
  &:hover {
    background: #fafcff;
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.08);
  }
`;

const CardImage = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }
  
  ${SolutionCard}:hover & img {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  
  h3 {
    color: #60a5fa;
    font-size: 1.3rem;
    margin-bottom: 0.8rem;
    font-weight: 600;
  }
  
  p {
    color: #64748b;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const ProcessSection = styled.section`
  padding: 6rem 5%;
  background: #fafcff;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const ProcessGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ProcessCard = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(96, 165, 250, 0.03);
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    background: #fafcff;
    box-shadow: 0 8px 30px rgba(96, 165, 250, 0.06);
  }
  
  &::before {
    content: "${props => props.number}";
    position: absolute;
    top: -15px;
    left: -15px;
    width: 40px;
    height: 40px;
    background: #60a5fa;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.2rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem;
    text-align: center;
    
    &::before {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const ProcessTitle = styled.h3`
  color: #60a5fa;
  font-size: 1.3rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ProcessDescription = styled.p`
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.6;
`;

const SolutionsSection = styled.section`
  background: #f8faff;
  padding: 6rem 5%;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const AudioVideo = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Audio Visual Solutions in Dubai | Professional AV Systems & Integration</title>
        <meta name="description" content="Transform your space with state-of-the-art audio visual solutions in Dubai. Professional AV consulting, design, installation & maintenance services for businesses." />
        <meta name="keywords" content="audio visual solutions dubai, AV systems, AV integration, audio video solutions, meeting room solutions, smart classroom, auditorium solutions" />
        <link rel="canonical" href="https://yourwebsite.com/audio-video" />
        <meta property="og:title" content="Audio Visual Solutions in Dubai | Professional AV Systems" />
        <meta property="og:description" content="Transform your space with state-of-the-art audio visual solutions in Dubai. Professional AV consulting, design, installation & maintenance services." />
        <meta property="og:url" content="https://yourwebsite.com/audio-video" />
        <meta property="og:type" content="website" />
      </Helmet>

      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
          >
            <span className="text-blue-400 mr-2">★</span>
            <span className="text-white/90 text-sm font-medium">Leading AV Solutions Provider</span>
          </motion.div>

          <h1>
            <MainHeading>Professional Audio Visual Solutions Dubai</MainHeading>
            <SubHeading>Transform Spaces Through Advanced AV Technology</SubHeading>
          </h1>
          <Description>
            Elevate your environment with state-of-the-art audiovisual solutions.
            We blend innovative technology with refined design for exceptional experiences.
          </Description>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <CtaButton to="/contact">
              Get Started
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </CtaButton>
          </motion.div>
        </HeroContent>
      </HeroSection>

      <main>
        <ContentSection>
          <Grid>
            <TextContent>
              <h2>Leading Audio Video Solutions Provider in Dubai</h2>
              <p>In today's fast-paced digital age, audio-visual solutions have become an essential part of business operations. From engaging presentations in boardrooms to immersive audio experiences at concerts and events, AV technology has revolutionized the way we communicate and connect with our environment.</p>
              <p>AV solutions, or audio-visual systems, combine audio and visual components to create a seamless multimedia experience. These systems are utilized across various sectors, including business, education, entertainment, and communication. As a trusted audio-visual equipment supplier in Dubai, GS-IT provides cutting-edge AV solutions that foster dynamic, real-time interactions. Through advanced AV technology, we help create immersive experiences that engage, inform, and inspire audiences.</p>
            </TextContent>
            <Image
              src="src/assets/img/audio/audioright.webp"
              alt="Professional Audio Visual Setup in Dubai Meeting Room"
            />
          </Grid>
        </ContentSection>

        <ServicesSection>
          <SectionTitle>AV Solutions that Elevate Engagement</SectionTitle>
          <ServicesGrid>
            <ServiceCard>
              <FaHeadset />
              <h3>AV Consulting Services</h3>
              <p>Collaborating with clients to assess their audio-video needs and enhance existing technology for improved performance and efficiency.</p>
            </ServiceCard>

            <ServiceCard>
              <FaPencilRuler />
              <h3>AV Design Services</h3>
              <p>Delivering tailored AV designs that ensure seamless integration and optimal functionality within the client's infrastructure.</p>
            </ServiceCard>

            <ServiceCard>
              <FaCode />
              <h3>AV Programming</h3>
              <p>Developing custom control systems and intuitive interfaces for easy and efficient operation of AV systems.</p>
            </ServiceCard>

            <ServiceCard>
              <FaTools />
              <h3>AV Installation & Integration</h3>
              <p>Providing professional installation and seamless integration of AV equipment, ensuring smooth functionality and full regulatory compliance.</p>
            </ServiceCard>

            <ServiceCard>
              <FaCog />
              <h3>AV Support & Maintenance</h3>
              <p>Offering ongoing support and maintenance services to address any client concerns and ensure consistent, high-performance operation of AV systems.</p>
            </ServiceCard>
          </ServicesGrid>
        </ServicesSection>

        <SolutionsSection>
          <SectionTitle>Explore Our Innovative Audio Video Solutions</SectionTitle>
          <SolutionsGrid>
            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/Meeting Room Solutions.webp"
                  alt="Meeting Room Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>Meeting Room Solutions</h3>
                <p>Optimize meetings and collaboration in rooms of all sizes with cutting-edge solutions from our comprehensive product suite, designed to enhance communication and boost productivity.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/Smart Classroom Solutions.webp"
                  alt="Smart Classroom Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>Smart Classroom Solutions</h3>
                <p>Transform education with smart devices like interactive whiteboards, video walls, and advanced audio systems, fostering a dynamic and engaging modern learning environment.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/Auditorium Solutions.webp"
                  alt="Auditorium Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>Auditorium Solutions</h3>
                <p>Enhance audience engagement during large-scale events and presentations with enterprise-grade projection screens, powerful sound systems, and state-of-the-art lighting techniques.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/BGM Solutions.webp"
                  alt="BGM Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>BGM Solutions</h3>
                <p>Create the perfect ambiance in any space with strategically placed background music systems, featuring high-quality speakers and advanced music players designed to set the ideal mood.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/PA and VA Systems.webp"
                  alt="PA and VA Systems"
                />
              </CardImage>
              <CardContent>
                <h3>PA and VA Systems</h3>
                <p>Deliver clear and reliable communication across large areas with innovative and versatile Public Address and Voice Alarm systems, ideal for metro stations, stadiums, and institutions.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/Home Cinema.webp"
                  alt="Home Cinema"
                />
              </CardImage>
              <CardContent>
                <h3>Home Cinema</h3>
                <p>Enjoy the ultimate cinematic experience at home with state-of-the-art home theater systems featuring high-definition displays, high-fidelity sound, and immersive lighting setups.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/Command & Control Center Solutions.webp"
                  alt="Command & Control Center Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>Command & Control Center Solutions</h3>
                <p>Centralized AV systems tailored to the unique requirements of control centers, enhancing operational efficiency through real-time monitoring and seamless communication.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/LED & Video Wall Solutions.webp"
                  alt="LED & Video Wall Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>LED & Video Wall Solutions</h3>
                <p>High-impact visual displays designed to captivate audiences, ideal for dynamic presentations, information sharing, and visually striking branding.</p>
              </CardContent>
            </SolutionCard>

            <SolutionCard>
              <CardImage>
                <img
                  src="/src/assets/img/audio/Crisis Management Solutions.webp"
                  alt="Crisis Management Solutions"
                />
              </CardImage>
              <CardContent>
                <h3>Crisis Management Solutions</h3>
                <p>Effectively manage emergencies with reliable audiovisual solutions, including advanced communication systems, real-time data displays, and fully equipped control centers for rapid response.</p>
              </CardContent>
            </SolutionCard>
          </SolutionsGrid>
        </SolutionsSection>

        <ProcessSection>
          <SectionTitle>Streamlined AV Installation Process for Maximum Efficiency</SectionTitle>
          <ProcessGrid>
            <ProcessCard number="1">
              <ProcessTitle>AV Consulting</ProcessTitle>
              <ProcessDescription>
                Collaborating closely with clients to understand their unique audiovisual requirements, we provide tailored and effective recommendations.
              </ProcessDescription>
            </ProcessCard>

            <ProcessCard number="2">
              <ProcessTitle>Solution Design</ProcessTitle>
              <ProcessDescription>
                Developing a detailed plan that includes the layout, components, and implementation strategy for a fully customized AV system.
              </ProcessDescription>
            </ProcessCard>

            <ProcessCard number="3">
              <ProcessTitle>Estimation</ProcessTitle>
              <ProcessDescription>
                Delivering transparent and detailed cost estimates with clear project timelines for client review and approval.
              </ProcessDescription>
            </ProcessCard>

            <ProcessCard number="4">
              <ProcessTitle>Project Execution</ProcessTitle>
              <ProcessDescription>
                Ensuring seamless installation by skilled GS-IT technicians, executed with precision and adherence to the approved plan.
              </ProcessDescription>
            </ProcessCard>

            <ProcessCard number="5">
              <ProcessTitle>Quality Check</ProcessTitle>
              <ProcessDescription>
                Conducting thorough performance evaluations of the installed AV systems to guarantee optimal functionality and efficiency.
              </ProcessDescription>
            </ProcessCard>

            <ProcessCard number="6">
              <ProcessTitle>Documentation and Training</ProcessTitle>
              <ProcessDescription>
                Providing user manuals, comprehensive documentation, and training sessions to ensure proper handling and management of AV equipment.
              </ProcessDescription>
            </ProcessCard>

            <ProcessCard number="7">
              <ProcessTitle>Maintenance</ProcessTitle>
              <ProcessDescription>
                Offering regular system check-ups, updates, and prompt troubleshooting to keep AV systems running smoothly and reliably
              </ProcessDescription>
            </ProcessCard>
          </ProcessGrid>
        </ProcessSection>
      </main>
    </HelmetProvider>
  );
};

export default AudioVideo;