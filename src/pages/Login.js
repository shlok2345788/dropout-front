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
  CircularProgress,
  Alert,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { 
  ArrowBack,
  Google as GoogleIcon,
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
  Email,
  Lock
} from '@mui/icons-material';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { authAPI } from '../services/api'; // Add this import

const Login = () => {
  const navigate = useNavigate();
  const { user, profileCompleted } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    if (user && profileCompleted) {
      navigate('/dashboard');
    } else if (user && !profileCompleted) {
      navigate('/comprehensive-form');
    }
  }, [user, profileCompleted, navigate]);

  // New function to handle email login with backend sync
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      // First sign in with Firebase
      const cred = await signInWithEmailAndPassword(auth, email, password);
      
      // Then sync with backend
      try {
        // Get Firebase ID token
        const idToken = await cred.user.getIdToken();
        
        // Sync with backend using Firebase token
        await authAPI.firebaseAuthLogin(idToken);
      } catch (backendError) {
        console.error('Backend sync error:', backendError);
        // Even if backend sync fails, we can still proceed with Firebase auth
      }
      
      // Navigation will be handled by useEffect
    } catch (err) {
      console.error('Login error:', err);
      let errorMessage = 'Failed to login. Please try again.';
      
      if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email address.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (err.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
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
      
      // Navigation will be handled by useEffect
    } catch (err) {
      console.error('Google login error:', err);
      let errorMessage = 'Google sign-in failed. Please try again.';
      
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
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: alpha('#ffffff', 0.05),
          top: '10%',
          right: '15%',
          animation: 'floatUp 15s ease-in-out infinite',
          '@keyframes floatUp': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' }
          }
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: alpha('#ffffff', 0.03),
          bottom: '20%',
          left: '10%',
          animation: 'floatUp 12s ease-in-out infinite reverse'
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
                      <LoginIcon sx={{ fontSize: '2.5rem', color: 'white' }} />
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
                    Welcome Back! 👋
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
                    Ready to continue your academic journey?
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleEmailLogin} sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
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
                    
                    <TextField 
                      fullWidth 
                      label="Password" 
                      type={showPassword ? 'text' : 'password'}
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
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
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="Remember me"
                      />
                      <Typography 
                        component={Link}
                        to="/forgot-password"
                        sx={{ 
                          color: '#667eea',
                          fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        Forgot password?
                      </Typography>
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
                          transform: 'translateY(-3px)',
                          boxShadow: '0 18px 50px rgba(102, 126, 234, 0.6)',
                          '&::before': {
                            left: '100%'
                          }
                        },
                        '&:active': {
                          transform: 'translateY(-1px)'
                        },
                        '&:disabled': {
                          background: 'linear-gradient(135deg, #ccc 0%, #999 100%)',
                          transform: 'none'
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                          Signing In...
                        </>
                      ) : (
                        'Sign In'
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
                  onClick={handleGoogleLogin}
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
                    Don't have an account?{' '}
                    <Typography 
                      component={Link}
                      to="/signup"
                      sx={{ 
                        color: '#667eea',
                        fontWeight: 600,
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      Sign up here
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

export default Login;