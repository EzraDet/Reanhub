import React, { useState, useEffect, useRef } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isPointer, setIsPointer] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const trailRefs = useRef([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            
            // Check if hovering over clickable element
            const target = e.target;
            const isClickable = 
                target.tagName === 'A' || 
                target.tagName === 'BUTTON' || 
                target.tagName === 'INPUT' ||
                target.tagName === 'SELECT' ||
                target.tagName === 'TEXTAREA' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[role="button"]') ||
                target.closest('.cursor-pointer') ||
                target.closest('.btn') ||
                target.closest('.hover-glow');
            
            setIsPointer(!!isClickable);
            setIsVisible(true);
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        const handleMouseEnter = () => {
            setIsVisible(true);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    useEffect(() => {
        if (cursorRef.current) {
            cursorRef.current.style.transform = `translate(${position.x - 4}px, ${position.y - 4}px)`;
            cursorRef.current.style.opacity = isVisible ? '1' : '0';
        }
        
        if (followerRef.current) {
            followerRef.current.style.transform = `translate(${position.x - 15}px, ${position.y - 15}px)`;
            followerRef.current.style.opacity = isVisible ? '1' : '0';
            followerRef.current.style.width = isPointer ? '40px' : '30px';
            followerRef.current.style.height = isPointer ? '40px' : '30px';
            followerRef.current.style.borderColor = isPointer ? 'rgba(6, 182, 212, 0.9)' : 'rgba(6, 182, 212, 0.4)';
            followerRef.current.style.backgroundColor = isPointer ? 'rgba(6, 182, 212, 0.1)' : 'transparent';
        }
    }, [position, isVisible, isPointer]);

    // Particle trail effect
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        if (!isVisible) {
            setParticles([]);
            return;
        }

        const interval = setInterval(() => {
            setParticles(prev => {
                const newParticle = {
                    x: position.x + (Math.random() - 0.5) * 15,
                    y: position.y + (Math.random() - 0.5) * 15,
                    life: 1,
                    id: Date.now() + Math.random(),
                    size: 1.5 + Math.random() * 3,
                };
                
                const updated = [...prev, newParticle]
                    .filter(p => p.life > 0)
                    .map(p => ({
                        ...p,
                        life: p.life - 0.03,
                        x: p.x + (Math.random() - 0.5) * 0.8,
                        y: p.y + (Math.random() - 0.5) * 0.8,
                    }));
                
                // Keep only recent particles
                return updated.slice(-10);
            });
        }, 25);

        return () => clearInterval(interval);
    }, [position, isVisible]);

    return (
        <>
            {/* Main cursor dot */}
            <div
                ref={cursorRef}
                className="fixed pointer-events-none z-[9999]"
                style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: isPointer ? '#06b6d4' : '#06b6d4',
                    boxShadow: isPointer 
                        ? '0 0 30px rgba(6, 182, 212, 0.9), 0 0 80px rgba(6, 182, 212, 0.5)' 
                        : '0 0 20px rgba(6, 182, 212, 0.8), 0 0 60px rgba(6, 182, 212, 0.4)',
                    transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
                    opacity: isVisible ? 1 : 0,
                    transition: 'transform 0.05s ease-out, opacity 0.2s ease, box-shadow 0.3s ease',
                    zIndex: 9999,
                }}
            />
            
            {/* Outer glow follower */}
            <div
                ref={followerRef}
                className="fixed pointer-events-none z-[9998]"
                style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    border: '2px solid rgba(6, 182, 212, 0.4)',
                    transform: `translate(${position.x - 15}px, ${position.y - 15}px)`,
                    opacity: isVisible ? 1 : 0,
                    transition: 'transform 0.15s ease-out, width 0.3s ease, height 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, opacity 0.2s ease',
                    backgroundColor: 'transparent',
                    zIndex: 9998,
                }}
            />

            {/* Particle trail */}
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="fixed pointer-events-none z-[9997]"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        width: particle.size,
                        height: particle.size,
                        borderRadius: '50%',
                        backgroundColor: `rgba(6, 182, 212, ${particle.life * 0.6})`,
                        transform: 'translate(-50%, -50%)',
                        opacity: particle.life,
                        transition: 'opacity 0.1s ease',
                        boxShadow: `0 0 ${particle.size * 2}px rgba(6, 182, 212, ${particle.life * 0.3})`,
                    }}
                />
            ))}
        </>
    );
};

export default CustomCursor;