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

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
      await signInWithPopup(auth, provider);
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
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        display: 'flex', 
        alignItems: 'center',
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
            radial-gradient(circle at 20% 80%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha('#ffffff', 0.1)} 0%, transparent 50%)
          `,
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
                  borderRadius: 6, 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  backdropFilter: 'blur(20px)', 
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.2)'
                }}
              >
                <Box textAlign="center" mb={4}>
                  <Box 
                    sx={{
                      display: 'inline-flex',
                      p: 2,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      mb: 3,
                      boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)'
                    }}
                  >
                    <LoginIcon sx={{ fontSize: '2rem', color: 'white' }} />
                  </Box>
                  
                  <Typography 
                    variant="h3" 
                    component="h1" 
                    gutterBottom 
                    sx={{ 
                      fontWeight: 800, 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 1
                    }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                    Sign in to continue your journey
                  </Typography>
                </Box>

                {error && (
                  <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                  </Alert>
                )}

                <Box component="form" onSubmit={handleEmailLogin} sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
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
                            <Email />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          '&:hover fieldset': {
                            borderColor: '#667eea',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          }
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
                            <Lock />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 3,
                          '&:hover fieldset': {
                            borderColor: '#667eea',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#667eea',
                          }
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
                        py: 1.8,
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        boxShadow: '0 8px 32px rgba(102, 126, 234, 0.37)',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
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