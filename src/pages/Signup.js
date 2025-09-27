import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Button,
  Typography,
  Fade,
  Slide,
  alpha,
  TextField,
  Divider,
  IconButton,
  InputAdornment,
  LinearProgress,
  Alert,
  CircularProgress
} from '@mui/material';
import { 
  ArrowBack,
  Google as GoogleIcon,
  Visibility,
  VisibilityOff,
  PersonAdd as SignupIcon,
  Email,
  Lock,
  Person
} from '@mui/icons-material';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { authAPI } from '../services/api'; // Add this import

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(calculatePasswordStrength(newPassword));
  };

  useEffect(() => {
    const unsub = auth.onAuthStateChanged((user) => {
      if (user) navigate('/dashboard');
    });
    return () => unsub();
  }, [navigate]);

  // New function to handle email signup with backend
  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate inputs
    if (!displayName.trim()) {
      setError('Please enter your full name');
      return;
    }
    
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    if (passwordStrength < 50) {
      setError('Please choose a stronger password');
      return;
    }

    setLoading(true);
    
    try {
      // First create user in Firebase
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName) {
        await updateProfile(cred.user, { displayName });
      }
      
      // Then sync with backend
      try {
        // Get Firebase ID token
        const idToken = await cred.user.getIdToken();
        
        // Sync with backend using Firebase token
        await authAPI.firebaseAuthLogin(idToken);
        
        // Navigate to dashboard
        navigate('/dashboard');
      } catch (backendError) {
        console.error('Backend sync error:', backendError);
        // Even if backend sync fails, we can still proceed with Firebase auth
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);
      let errorMessage = 'Failed to create account. Please try again.';
      
      if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account already exists with this email address.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many requests. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    setLoading(true);
    
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Sync with backend using Google ID token
      try {
        const idToken = await result.user.getIdToken();
        await authAPI.googleVerify({ id_token: idToken });
      } catch (backendError) {
        console.error('Backend sync error:', backendError);
      }
      
      navigate('/dashboard');
    } catch (err) {
      console.error('Google signup error:', err);
      let errorMessage = 'Google sign-up failed. Please try again.';
      
      if (err.code === 'auth/popup-blocked') {
        errorMessage = 'Popup blocked by browser. Please allow popups and try again.';
      } else if (err.code === 'auth/account-exists-with-different-credential') {
        errorMessage = 'An account already exists with this email. Please sign in using your original method.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)', 
        display: 'flex', 
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 25% 25%, ${alpha('#ff6b6b', 0.15)} 0%, transparent 40%),
            radial-gradient(circle at 75% 75%, ${alpha('#4ecdc4', 0.15)} 0%, transparent 40%),
            radial-gradient(circle at 75% 25%, ${alpha('#45b7d1', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 25% 75%, ${alpha('#96ceb4', 0.1)} 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translate(0px, 0px)' },
            '33%': { transform: 'translate(30px, -30px)' },
            '66%': { transform: 'translate(-20px, 20px)' }
          }
        }}
      />

      {/* Floating Geometric Shapes */}
      <Box
        sx={{
          position: 'absolute',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: alpha('#ffffff', 0.05),
          top: '15%',
          right: '10%',
          animation: 'floatUp 18s ease-in-out infinite',
          '@keyframes floatUp': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-25px) rotate(180deg)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: alpha('#ffffff', 0.03),
          bottom: '15%',
          left: '8%',
          animation: 'floatUp 15s ease-in-out infinite reverse'
        }}
      />

      {/* Background Grid Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          opacity: 0.3
        }}
      />

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Fade in timeout={800}>
          <Box>
            <Button 
              startIcon={<ArrowBack />} 
              component={Link}
              to="/"
              sx={{ 
                color: 'white', 
                mb: 4,
                fontSize: '1rem',
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: alpha('#ffffff', 0.1),
                  transform: 'translateX(-4px)',
                  transition: 'all 0.3s ease'
                } 
              }}
            >
              Back to Home
            </Button>

            <Slide direction="up" in timeout={1000}>
              <Paper 
                elevation={24} 
                sx={{ 
                  p: { xs: 4, sm: 6 }, 
                  borderRadius: 8, 
                  background: 'rgba(255, 255, 255, 0.98)', 
                  backdropFilter: 'blur(30px)', 
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: `
                    0 25px 50px rgba(0, 0, 0, 0.15),
                    inset 0 1px 0 rgba(255, 255, 255, 0.6)
                  `,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 3s ease-in-out infinite',
                    '@keyframes shimmer': {
                      '0%': { backgroundPosition: '-200% 0' },
                      '100%': { backgroundPosition: '200% 0' }
                    }
                  }
                }}
              >
                <Box textAlign="center" mb={5}>
                  <Fade in timeout={1200}>
                    <Box 
                      sx={{
                        display: 'inline-flex',
                        p: 3,
                        borderRadius: '24px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        mb: 3,
                        boxShadow: `
                          0 12px 40px rgba(102, 126, 234, 0.4),
                          inset 0 2px 0 rgba(255, 255, 255, 0.3)
                        `,
                        position: 'relative',
                        animation: 'pulse 2s ease-in-out infinite',
                        '@keyframes pulse': {
                          '0%, 100%': { transform: 'scale(1)' },
                          '50%': { transform: 'scale(1.05)' }
                        }
                      }}
                    >
                      <SignupIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
                    </Box>
                  </Fade>
                  
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 900, 
                      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #667eea 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1,
                      fontSize: { xs: '2rem', sm: '3rem' },
                      textShadow: '0 4px 8px rgba(0,0,0,0.1)'
                    }}
                  >
                    Join Us Today! 🚀
                  </Typography>
                  <Typography 
                    variant="body1" 
                    color="text.secondary" 
                    sx={{ 
                      fontSize: '1.2rem',
                      fontWeight: 500,
                      letterSpacing: '0.5px',
                      lineHeight: 1.6
                    }}
                  >
                    Transform education with AI-powered insights
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleEmailSignup} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
                    <TextField 
                      fullWidth 
                      label="Full Name" 
                      value={displayName} 
                      onChange={(e) => setDisplayName(e.target.value)}
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#667eea',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                            '& fieldset': {
                              borderColor: '#667eea'
                            }
                          },
                          '&.Mui-focused': {
                            borderColor: '#667eea',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
                            '& fieldset': {
                              borderColor: '#667eea',
                              borderWidth: '2px'
                            }
                          },
                          '& fieldset': {
                            borderColor: '#e0e0e0'
                          }
                        },
                        '& .MuiInputLabel-root': {
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#667eea',
                            fontWeight: 600
                          }
                        },
                        '& .MuiInputBase-input': {
                          color: '#333'
                        }
                      }}
                    />
                    
                    <TextField 
                      fullWidth 
                      label="Email Address" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Email sx={{ color: '#667eea' }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: '#ffffff',
                          border: '1px solid #e0e0e0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            borderColor: '#667eea',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                            '& fieldset': {
                              borderColor: '#667eea'
                            }
                          },
                          '&.Mui-focused': {
                            borderColor: '#667eea',
                            boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
                            '& fieldset': {
                              borderColor: '#667eea',
                              borderWidth: '2px'
                            }
                          },
                          '& fieldset': {
                            borderColor: '#e0e0e0'
                          }
                        },
                        '& .MuiInputLabel-root': {
                          color: '#666',
                          '&.Mui-focused': {
                            color: '#667eea',
                            fontWeight: 600
                          }
                        },
                        '& .MuiInputBase-input': {
                          color: '#333'
                        }
                      }}
                    />
                    
                    <Box>
                      <TextField 
                        fullWidth 
                        label="Password" 
                        type={showPassword ? 'text' : 'password'}
                        value={password} 
                        onChange={handlePasswordChange}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Lock sx={{ color: '#667eea' }} />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                                sx={{ 
                                  color: '#667eea',
                                  '&:hover': { 
                                    backgroundColor: alpha('#667eea', 0.1) 
                                  } 
                                }}
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          )
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: '#ffffff',
                            border: '1px solid #e0e0e0',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              borderColor: '#667eea',
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)',
                              '& fieldset': {
                                borderColor: '#667eea'
                              }
                            },
                            '&.Mui-focused': {
                              borderColor: '#667eea',
                              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.25)',
                              '& fieldset': {
                                borderColor: '#667eea',
                                borderWidth: '2px'
                              }
                            },
                            '& fieldset': {
                              borderColor: '#e0e0e0'
                            }
                          },
                          '& .MuiInputLabel-root': {
                            color: '#666',
                            '&.Mui-focused': {
                              color: '#667eea',
                              fontWeight: 600
                            }
                          },
                          '& .MuiInputBase-input': {
                            color: '#333'
                          }
                        }}
                      />
                      
                      {password && (
                        <Box sx={{ mt: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Typography variant="caption" color="text.secondary">
                              Password Strength:
                            </Typography>
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                ml: 1,
                                color: passwordStrength < 50 ? 'error.main' : passwordStrength < 75 ? 'warning.main' : 'success.main',
                                fontWeight: 600
                              }}
                            >
                              {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Medium' : 'Strong'}
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={passwordStrength} 
                            sx={{
                              height: 4,
                              borderRadius: 2,
                              '& .MuiLinearProgress-bar': {
                                backgroundColor: passwordStrength < 50 ? 'error.main' : passwordStrength < 75 ? 'warning.main' : 'success.main'
                              }
                            }}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            Use at least 8 characters with a mix of letters, numbers & symbols
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    
                    <Button 
                      type="submit" 
                      variant="contained" 
                      fullWidth 
                      size="large"
                      disabled={loading}
                      sx={{
                        py: 2.2,
                        fontSize: '1.2rem',
                        fontWeight: 700,
                        borderRadius: 4,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 12px 40px rgba(102, 126, 234, 0.4)',
                        position: 'relative',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&::before': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '100%',
                          height: '100%',
                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                          transition: 'left 0.5s',
                        },
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 12px 40px rgba(102, 126, 234, 0.5)'
                        },
                        '&:disabled': {
                          background: 'linear-gradient(135deg, #ccc 0%, #999 100%)'
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                          Creating Account...
                        </>
                      ) : (
                        'Create Account'
                      )}
                    </Button>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>

                <Button 
                  variant="outlined" 
                  fullWidth 
                  size="large"
                  onClick={handleGoogleSignup}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <GoogleIcon />}
                  sx={{
                    py: 1.8,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    borderRadius: 3,
                    borderColor: '#dadce0',
                    color: '#3c4043',
                    borderWidth: 2,
                    mb: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: '#667eea',
                      backgroundColor: alpha('#667eea', 0.04),
                      transform: 'translateY(-1px)',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.15)'
                    }
                  }}
                >
                  Continue with Google
                </Button>
                
                <Box textAlign="center">
                  <Typography variant="body2" color="text.secondary">
                    Already have an account?{' '}
                    <Typography 
                      component={Link}
                      to="/login"
                      sx={{ 
                        color: '#667eea',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Sign in here
                    </Typography>
                  </Typography>
                </Box>
              </Paper>
            </Slide>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Signup;