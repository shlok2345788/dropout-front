import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Fade,
  Slide,
  Zoom,
  alpha,
  Stack,
  Chip
} from '@mui/material';
import {
  Analytics,
  TrendingUp,
  Security,
  Psychology,
  AutoGraph,
  Insights,
  StarBorder
} from '@mui/icons-material';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Psychology />,
      title: 'AI-Powered Predictions',
      description: 'Advanced machine learning algorithms analyze student data to predict dropout risk with 95% accuracy.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: <Analytics />,
      title: 'Smart Analytics',
      description: 'Beautiful dashboards and insights help educators make data-driven decisions for student success.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: <TrendingUp />,
      title: 'Early Intervention',
      description: 'Identify at-risk students weeks before traditional methods and implement targeted support.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: <AutoGraph />,
      title: 'Performance Tracking',
      description: 'Monitor academic progress, attendance patterns, and engagement metrics in real-time.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: <Insights />,
      title: 'Actionable Insights',
      description: 'Get personalized recommendations and intervention strategies for each student.',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: <Security />,
      title: 'Secure & Compliant',
      description: 'FERPA compliant with enterprise-grade security protecting sensitive student information.',
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            radial-gradient(circle at 25% 25%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%)
          `,
          zIndex: 0
        }}
      />

      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, pt: { xs: 8, md: 12 }, pb: 8 }}>
        <Fade in timeout={1000}>
          <Box textAlign="center" mb={8}>
            {/* Status Badge */}
            <Slide direction="down" in timeout={800}>
              <Box mb={3}>
                <Chip
                  icon={<StarBorder />}
                  label="🚀 AI-Powered Education Technology"
                  sx={{
                    background: alpha('#ffffff', 0.2),
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.9rem',
                    py: 2,
                    px: 1,
                    '& .MuiChip-icon': { color: 'white' }
                  }}
                />
              </Box>
            </Slide>
            
            <Slide direction="up" in timeout={1000}>
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f8ff 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 3,
                  letterSpacing: '-0.02em'
                }}
              >
                Predict Student Success
                <br />
                <Typography
                  component="span"
                  sx={{
                    background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontSize: 'inherit',
                    fontWeight: 'inherit'
                  }}
                >
                  Before It's Too Late
                </Typography>
              </Typography>
            </Slide>
            
            <Slide direction="up" in timeout={1200}>
              <Typography
                variant="h5"
                component="h2"
                sx={{
                  mb: 5,
                  color: alpha('#ffffff', 0.9),
                  fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                  fontWeight: 400,
                  maxWidth: '700px',
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Transform education with AI-powered insights that identify at-risk students 
                and provide actionable interventions to ensure every student succeeds.
              </Typography>
            </Slide>

            <Zoom in timeout={1400}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.37)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)',
                      background: 'linear-gradient(135deg, #5a67d8 0%, #667eea 100%)'
                    }
                  }}
                >
                  Get Started Free
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/login')}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    borderColor: alpha('#ffffff', 0.5),
                    color: 'white',
                    borderWidth: 2,
                    backdropFilter: 'blur(10px)',
                    background: alpha('#ffffff', 0.1),
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'white',
                      background: alpha('#ffffff', 0.2),
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 32px rgba(255, 255, 255, 0.2)'
                    }
                  }}
                >
                  Sign In
                </Button>
              </Stack>
            </Zoom>
          </Box>
        </Fade>

        {/* Features Section */}
        <Fade in timeout={1600}>
          <Box mt={12}>
            <Typography
              variant="h2"
              component="h2"
              textAlign="center"
              sx={{
                mb: 2,
                fontWeight: 700,
                fontSize: { xs: '2rem', md: '2.8rem' },
                color: 'white'
              }}
            >
              Powerful Features for Modern Education
            </Typography>
            <Typography
              variant="h6"
              textAlign="center"
              sx={{ mb: 6, color: alpha('#ffffff', 0.8), maxWidth: '600px', mx: 'auto' }}
            >
              Everything you need to transform student outcomes with data-driven insights
            </Typography>
            
            <Grid container spacing={4}>
              {features.map((feature, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Slide
                    direction="up"
                    in
                    timeout={1800 + index * 150}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        background: alpha('#ffffff', 0.1),
                        backdropFilter: 'blur(20px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: 4,
                        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'translateY(-12px)',
                          background: alpha('#ffffff', 0.15),
                          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
                          borderColor: alpha('#ffffff', 0.3)
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4, textAlign: 'center' }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            p: 2.5,
                            borderRadius: '20px',
                            background: feature.gradient,
                            mb: 3,
                            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                            '& svg': {
                              fontSize: '2.2rem',
                              color: 'white'
                            }
                          }}
                        >
                          {feature.icon}
                        </Box>
                        <Typography
                          variant="h5"
                          component="h3"
                          gutterBottom
                          sx={{ 
                            color: 'white', 
                            fontWeight: 700,
                            mb: 2
                          }}
                        >
                          {feature.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ 
                            color: alpha('#ffffff', 0.85), 
                            lineHeight: 1.7,
                            fontSize: '1rem'
                          }}
                        >
                          {feature.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Slide>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>

        {/* Demo Section */}
        <Fade in timeout={2000}>
          <Box
            mt={12}
            textAlign="center"
            sx={{
              p: { xs: 4, md: 6 },
              borderRadius: 6,
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background decoration */}
            <Box
              sx={{
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                opacity: 0.1,
                zIndex: 0
              }}
            />
            
            <Box position="relative" zIndex={1}>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 3,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  color: 'white'
                }}
              >
                Ready to Transform Education?
              </Typography>
              <Typography
                variant="h6"
                sx={{ 
                  mb: 4, 
                  color: alpha('#ffffff', 0.9), 
                  maxWidth: '600px', 
                  mx: 'auto',
                  lineHeight: 1.6
                }}
              >
                Join thousands of educators who are already using AI to improve student outcomes. 
                Start with our comprehensive assessment and see the power of predictive analytics.
              </Typography>
              
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                justifyContent="center"
                sx={{ mt: 4 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/comprehensive-form')}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    boxShadow: '0 8px 32px rgba(240, 147, 251, 0.4)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 12px 40px rgba(240, 147, 251, 0.6)',
                    }
                  }}
                >
                  🚀 Try Demo Assessment
                </Button>
                
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/analytics')}
                  sx={{
                    px: 4,
                    py: 2,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: '50px',
                    borderColor: alpha('#ffffff', 0.5),
                    color: 'white',
                    borderWidth: 2,
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'white',
                      background: alpha('#ffffff', 0.1),
                      transform: 'translateY(-2px)',
                    }
                  }}
                >
                  📊 View Sample Analytics
                </Button>
              </Stack>
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Floating Elements */}
      {[...Array(6)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: { xs: 40, md: 60 + i * 10 },
            height: { xs: 40, md: 60 + i * 10 },
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${alpha('#ffffff', 0.1)} 0%, ${alpha('#ffffff', 0.05)} 100%)`,
            top: `${10 + i * 15}%`,
            left: `${5 + i * 15}%`,
            animation: `float ${6 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`,
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
              '50%': { transform: `translateY(${-20 - i * 5}px) rotate(180deg)` }
            }
          }}
        />
      ))}
    </Box>
  );
};

export default LandingPage;