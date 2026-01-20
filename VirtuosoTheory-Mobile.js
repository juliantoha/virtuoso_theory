// VirtuosoTheory-Mobile.js - Complete Rewrite with JSON-based Levels

// SVG Icon helper - simple, clean icons matching the cyberpunk aesthetic
const GameIcons = {
    // Returns inline SVG markup for icons
    get(name, size = 16, color = 'currentColor') {
        const icons = {
            piano: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <line x1="6" y1="4" x2="6" y2="14"/><line x1="10" y1="4" x2="10" y2="14"/>
                <line x1="14" y1="4" x2="14" y2="14"/><line x1="18" y1="4" x2="18" y2="14"/>
                <rect x="5" y="4" width="2" height="8" fill="${color}"/><rect x="9" y="4" width="2" height="8" fill="${color}"/>
                <rect x="13" y="4" width="2" height="8" fill="${color}"/><rect x="17" y="4" width="2" height="8" fill="${color}"/>
            </svg>`,
            microphone: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <rect x="9" y="2" width="6" height="11" rx="3"/>
                <path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="17" x2="12" y2="22"/>
                <line x1="8" y1="22" x2="16" y2="22"/>
            </svg>`,
            midi: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <circle cx="8" cy="12" r="2"/><circle cx="16" cy="12" r="2"/>
                <rect x="2" y="6" width="20" height="12" rx="2"/>
                <circle cx="12" cy="9" r="1" fill="${color}"/><circle cx="12" cy="15" r="1" fill="${color}"/>
            </svg>`,
            touch: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <rect x="5" y="2" width="14" height="20" rx="2"/>
                <circle cx="12" cy="18" r="1" fill="${color}"/>
                <line x1="9" y1="5" x2="15" y2="5"/>
            </svg>`,
            note: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <circle cx="8" cy="18" r="4" fill="${color}"/>
                <path d="M12 18V4l8-2v14"/>
                <circle cx="20" cy="16" r="4" fill="${color}"/>
            </svg>`,
            score: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3" fill="${color}"/>
                <circle cx="18" cy="16" r="3" fill="${color}"/>
                <line x1="2" y1="8" x2="7" y2="8" opacity="0.5"/><line x1="2" y1="11" x2="7" y2="11" opacity="0.5"/>
                <line x1="2" y1="14" x2="7" y2="14" opacity="0.5"/>
            </svg>`,
            check: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"/>
            </svg>`,
            warning: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round">
                <path d="M12 2L2 22h20L12 2z"/>
                <line x1="12" y1="9" x2="12" y2="13"/><circle cx="12" cy="17" r="1" fill="${color}"/>
            </svg>`,
            star: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}" stroke="none">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
            </svg>`,
            starEmpty: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2">
                <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9"/>
            </svg>`,
            back: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
            </svg>`,
            hand: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v6"/>
                <path d="M10 10.5V2a2 2 0 0 0-4 0v9"/><path d="M6 13V9a2 2 0 0 0-4 0v5a8 8 0 0 0 16 0v-2a2 2 0 0 0-4 0"/>
            </svg>`,
            trophy: `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M6 9H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2"/>
                <path d="M18 9h2a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-2"/>
                <path d="M4 22h16"/><path d="M10 22V12a2 2 0 0 1 4 0v10"/>
                <rect x="6" y="3" width="12" height="9" rx="2"/>
            </svg>`
        };
        return icons[name] || '';
    }
};

// Mobile-optimized InputManager class
class InputManager {
    constructor(game) {
        this.game = game;
        this.currentInputMethod = 'virtual';
        this.midiAccess = null;
        this.audioContext = null;
        this.microphone = null;
        this.analyser = null;
        this.isListening = false;
        
        // Mobile detection
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.isIPad = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        
        // Pitch detection parameters - CALIBRATED VALUES
        this.pitchBuffer = [];
        this.pitchBufferSize = 5;
        this.noteStabilityCounter = 0;
        this.noteStabilityThreshold = 2; // Lowered for faster response
        this.lastStableNote = null;
        this.lastDetectedNote = null;
        this.silenceCounter = 0;
        
        // Volume thresholds - CRITICAL FOR DETECTION
        this.noteOnThreshold = 0.005;  // Very low for sensitivity
        this.noteOffThreshold = 0.003;
        this.pitchConfidenceThreshold = 0.3; // Lower for better detection
        
        this.init();
    }
    
    async init() {
        // Check for available input methods
        this.availableMethods = {
            virtual: true,
            midi: !this.isMobile && await this.checkMIDIAvailability(),
            microphone: await this.checkMicrophoneAvailability()
        };
        
        // Create UI for input selection
        this.createInputSelector();
    }
    
    createInputSelector() {
        const container = document.createElement('div');
        container.id = 'inputSelector';
        container.innerHTML = `
            <div style="color: #00ffff; font-weight: bold; font-size: 10px; margin-bottom: 8px; text-shadow: 0 0 8px rgba(0, 255, 255, 0.6); letter-spacing: 1.5px; text-align: center;">
                INPUT
            </div>
        `;
        
        // Only show available methods on mobile
        const methods = this.isMobile ?
            [
                { id: 'virtual', name: 'Touch', icon: GameIcons.get('touch', 14), description: 'Touch Piano' },
                { id: 'microphone', name: 'Acoustic', icon: GameIcons.get('microphone', 14), description: 'Microphone' }
            ] :
            [
                { id: 'virtual', name: 'Virtual', icon: GameIcons.get('piano', 14), description: 'Keyboard/Click' },
                { id: 'midi', name: 'MIDI', icon: GameIcons.get('midi', 14), description: 'USB/MIDI' },
                { id: 'microphone', name: 'Acoustic', icon: GameIcons.get('microphone', 14), description: 'Microphone' }
            ];
        
        // Add CSS for disabled state
        const style = document.createElement('style');
        style.textContent = `
            .input-method-btn:disabled {
                background: rgba(30, 30, 30, 0.5) !important;
                cursor: not-allowed !important;
                opacity: 0.4 !important;
            }
            .input-method-btn:disabled:hover {
                box-shadow: none !important;
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
        
        methods.forEach(method => {
            if (!this.availableMethods[method.id]) return;
            
            const button = document.createElement('button');
            button.id = `input-${method.id}`;
            button.className = 'input-method-btn';
            
            const leftContent = document.createElement('div');
            leftContent.style.cssText = 'display: flex; align-items: center; gap: 6px;';
            leftContent.innerHTML = `
                <span style="display: flex; align-items: center; opacity: 0.9;">${method.icon}</span>
                <span style="font-weight: 600;">${method.name}</span>
            `;

            const rightContent = document.createElement('div');
            rightContent.innerHTML = this.currentInputMethod === method.id ?
                `<span style="color: #00ff88; display: flex; align-items: center;">${GameIcons.get('check', 12, '#00ff88')}</span>` : '';
            
            button.appendChild(leftContent);
            button.appendChild(rightContent);
            
            button.addEventListener('click', () => this.switchInputMethod(method.id));
            button.title = method.description;
            
            container.appendChild(button);
        });
        
        // Add status indicator
        this.statusIndicator = document.createElement('div');
        this.statusIndicator.id = 'inputStatus';
        this.statusIndicator.style.cssText = `
            margin-top: 6px;
            padding: 4px;
            background: rgba(0, 0, 0, 0.2);
            border-radius: 3px;
            font-size: 9px;
            text-align: center;
            color: #00ff88;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        `;
        this.updateStatus(this.isMobile ? 'Touch Active' : 'Virtual Active');
        container.appendChild(this.statusIndicator);
        
        // Add debug monitor (only shows when microphone is active)
        this.debugMonitor = document.createElement('div');
        this.debugMonitor.id = 'debugMonitor';
        this.debugMonitor.style.cssText = `
            display: none;
            margin-top: 8px;
            padding: 8px;
            background: rgba(0, 0, 0, 0.8);
            border: 1px solid #00ff88;
            border-radius: 4px;
            font-size: 10px;
            font-family: monospace;
            color: #00ff88;
        `;
        container.appendChild(this.debugMonitor);
        
        document.body.appendChild(container);
    }
    
    updateStatus(message, isError = false) {
        if (this.statusIndicator) {
            let shortMessage = message;
            if (message.includes('MIDI:')) {
                shortMessage = 'MIDI Connected';
            } else if (message.includes('Listening')) {
                shortMessage = 'Mic Active';
            } else if (message.includes('Virtual')) {
                shortMessage = 'Virtual Active';
            } else if (message.includes('Touch')) {
                shortMessage = 'Touch Active';
            } else if (message.includes('No MIDI')) {
                shortMessage = 'No Device';
            } else if (message.includes('Detected:')) {
                shortMessage = message.split('Detected:')[1].trim();
            }
            
            this.statusIndicator.textContent = shortMessage;
            this.statusIndicator.style.color = isError ? '#ff0066' : '#00ff88';
        }
    }
    
    updateDebugMonitor(rms, pitch, confidence) {
        if (this.debugMonitor && this.currentInputMethod === 'microphone') {
            this.debugMonitor.style.display = 'block';
            
            // Get current noise floor
            const noiseFloor = this.getNoiseFloor ? this.getNoiseFloor() : 0.005;
            const snr = rms / noiseFloor;
            
            // Check if we would pass piano detection
            let status = 'Listening';
            if (rms > noiseFloor * 3) {
                if (pitch && pitch >= 27.5 && pitch <= 4186) {
                    status = 'Piano range';
                } else if (pitch) {
                    status = 'Non-piano';
                } else {
                    status = 'No pitch';
                }
            }
            
            this.debugMonitor.innerHTML = `
                <div>Level: ${(rms * 1000).toFixed(2)} | SNR: ${snr.toFixed(1)}</div>
                <div>Pitch: ${pitch ? pitch.toFixed(1) + ' Hz' : '--'}</div>
                <div>Conf: ${confidence ? (confidence * 100).toFixed(0) + '%' : '--'}</div>
                <div>Note: ${pitch ? this.game.midiToNote(this.frequencyToMidi(pitch)) : '--'}</div>
                <div style="color: ${status === 'Piano range' ? '#00ff88' : '#ff6666'}">Status: ${status}</div>
            `;
        } else if (this.debugMonitor) {
            this.debugMonitor.style.display = 'none';
        }
    }
    
    async switchInputMethod(method) {
        // Check if method is disabled
        const button = document.getElementById(`input-${method}`);
        if (button && button.disabled) {
            return; // Don't switch if button is disabled
        }
        
        this.disableCurrentMethod();
        this.currentInputMethod = method;
        this.updateButtonStates();
        
        switch(method) {
            case 'virtual':
                this.enableVirtualPiano();
                break;
            case 'midi':
                if (!this.isMobile) {
                    await this.enableMIDI();
                }
                break;
            case 'microphone':
                await this.enableMicrophone();
                break;
        }
    }
    
    updateButtonStates() {
        const methods = this.isMobile ? ['virtual', 'microphone'] : ['virtual', 'midi', 'microphone'];
        
        // Check if current level requires multiple notes
        const isChordLevel = this.game.currentLevel && this.game.currentQuestion && 
                            ['dyad', 'triad', 'seventh'].includes(this.game.currentQuestion.type);
        
        methods.forEach(method => {
            const button = document.getElementById(`input-${method}`);
            if (button) {
                const isActive = this.currentInputMethod === method;
                const rightDiv = button.querySelector('div:last-child');
                if (rightDiv) {
                    rightDiv.innerHTML = isActive ? 
                        '<span style="color: #00ff88; font-size: 12px;">✔</span>' : '';
                }
                
                // Disable microphone for chord levels
                if (method === 'microphone' && isChordLevel) {
                    button.disabled = true;
                    button.style.opacity = '0.3';
                    button.style.cursor = 'not-allowed';
                    button.title = 'Microphone cannot detect multiple notes (chords)';
                    
                    // Add disabled indicator
                    if (!button.querySelector('.disabled-badge')) {
                        const badge = document.createElement('span');
                        badge.className = 'disabled-badge';
                        badge.style.cssText = 'font-size: 9px; color: #ff6666; margin-left: 4px;';
                        badge.textContent = '(Single notes only)';
                        const leftDiv = button.querySelector('div:first-child');
                        if (leftDiv) {
                            leftDiv.appendChild(badge);
                        }
                    }
                } else if (method === 'microphone') {
                    // Re-enable for single note levels
                    button.disabled = false;
                    button.style.opacity = '1';
                    button.style.cursor = 'pointer';
                    button.title = 'Microphone';
                    
                    // Remove disabled badge
                    const badge = button.querySelector('.disabled-badge');
                    if (badge) {
                        badge.remove();
                    }
                }
            }
        });
    }
    
    checkAndSwitchFromMicrophoneIfNeeded() {
        // Check if we need to switch away from microphone
        if (this.currentInputMethod === 'microphone' && this.game.currentLevel && this.game.currentQuestion) {
            if (['dyad', 'triad', 'seventh'].includes(this.game.currentQuestion.type)) {
                // Switch to virtual automatically
                this.switchInputMethod('virtual');
                
                // Show notification
                const notification = document.createElement('div');
                notification.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: rgba(0, 20, 40, 0.95);
                    border: 2px solid #ff6666;
                    border-radius: 10px;
                    padding: 20px;
                    color: white;
                    font-family: 'Orbitron', Arial, sans-serif;
                    text-align: center;
                    z-index: 10000;
                    max-width: 300px;
                    box-shadow: 0 0 30px rgba(255, 102, 102, 0.5);
                `;
                notification.innerHTML = `
                    <div style="color: #ff6666; font-weight: bold; margin-bottom: 10px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                        ${GameIcons.get('warning', 18, '#ff6666')} INPUT CHANGED
                    </div>
                    <div style="font-size: 12px;">
                        Switched to Virtual Piano<br>
                        <span style="color: #ffaaaa; font-size: 11px;">
                        Microphone can only detect single notes, not chords
                        </span>
                    </div>
                `;
                document.body.appendChild(notification);
                
                // Auto-remove after 3 seconds
                setTimeout(() => {
                    notification.style.transition = 'opacity 0.5s';
                    notification.style.opacity = '0';
                    setTimeout(() => notification.remove(), 500);
                }, 3000);
            }
        }
    }
    
    disableCurrentMethod() {
        switch(this.currentInputMethod) {
            case 'midi':
                this.disableMIDI();
                break;
            case 'microphone':
                this.disableMicrophone();
                break;
        }
    }
    
    enableVirtualPiano() {
        this.updateStatus(this.isMobile ? 'Touch Piano Active' : 'Virtual Piano Active');
    }
    
    async checkMIDIAvailability() {
        return 'requestMIDIAccess' in navigator && !this.isMobile;
    }
    
    async enableMIDI() {
        if (this.isMobile) return;
        
        try {
            if (!this.midiAccess) {
                this.midiAccess = await navigator.requestMIDIAccess();
            }
            
            this.midiAccess.inputs.forEach(input => {
                input.onmidimessage = null;
            });
            
            if (this.midiAccess.inputs.size === 0) {
                this.updateStatus('No MIDI device found', true);
                setTimeout(() => {
                    this.switchInputMethod('virtual');
                }, 2000);
                return;
            }
            
            let deviceName = 'Unknown Device';
            this.midiAccess.inputs.forEach(input => {
                deviceName = input.name || deviceName;
                input.onmidimessage = (message) => this.handleMIDIMessage(message);
            });
            
            this.midiAccess.onstatechange = (e) => {
                if (e.port.type === 'input') {
                    if (e.port.state === 'connected') {
                        e.port.onmidimessage = (message) => this.handleMIDIMessage(message);
                        this.updateStatus(`MIDI Connected: ${e.port.name}`);
                    } else if (e.port.state === 'disconnected') {
                        this.updateStatus('MIDI Disconnected', true);
                    }
                }
            };
            
            this.updateStatus(`MIDI: ${deviceName}`);
        } catch (error) {
            console.error('MIDI setup failed:', error);
            this.updateStatus('MIDI setup failed', true);
            this.switchInputMethod('virtual');
        }
    }
    
    disableMIDI() {
        if (this.midiAccess) {
            this.midiAccess.inputs.forEach(input => {
                input.onmidimessage = null;
            });
        }
    }
    
    handleMIDIMessage(message) {
        const command = message.data[0] >> 4;
        const midiNote = message.data[1];
        const velocity = message.data[2] || 0;
        
        if (command === 9 && velocity > 0) {
            this.game.handleNotePress(midiNote, velocity);
        } else if (command === 8 || (command === 9 && velocity === 0)) {
            this.game.handleNoteRelease(midiNote);
        }
    }
    
    async checkMicrophoneAvailability() {
        return 'mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices;
    }
    
    async enableMicrophone() {
        try {
            this.updateStatus('Requesting microphone access...');
            
            // Request microphone permission
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false,
                    sampleRate: 44100
                }
            });
            
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 44100 });
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            
            // Create more sophisticated audio processing chain for piano detection
            this.analyser = this.audioContext.createAnalyser();
            this.analyser.fftSize = 8192; // Higher resolution for better harmonic analysis
            this.analyser.smoothingTimeConstant = 0.1; // Less smoothing for faster response
            
            // Create frequency analyser for harmonic detection
            this.harmonicAnalyser = this.audioContext.createAnalyser();
            this.harmonicAnalyser.fftSize = 16384; // Very high resolution
            this.harmonicAnalyser.smoothingTimeConstant = 0.3;
            
            // Multi-stage filtering for piano isolation
            // 1. Remove very low frequencies (rumble, AC hum)
            this.rumbleFilter = this.audioContext.createBiquadFilter();
            this.rumbleFilter.type = 'highpass';
            this.rumbleFilter.frequency.value = 70; // Below lowest piano note
            this.rumbleFilter.Q.value = 1;
            
            // 2. Notch filter for 60Hz electrical hum
            this.humFilter = this.audioContext.createBiquadFilter();
            this.humFilter.type = 'notch';
            this.humFilter.frequency.value = 60;
            this.humFilter.Q.value = 30;
            
            // 3. Piano range bandpass
            this.pianoRangeFilter = this.audioContext.createBiquadFilter();
            this.pianoRangeFilter.type = 'bandpass';
            this.pianoRangeFilter.frequency.value = 500; // Center frequency
            this.pianoRangeFilter.Q.value = 0.5; // Wide band
            
            // 4. Remove very high frequencies (above piano range)
            this.highCutFilter = this.audioContext.createBiquadFilter();
            this.highCutFilter.type = 'lowpass';
            this.highCutFilter.frequency.value = 4200; // Highest piano note ~4186 Hz
            this.highCutFilter.Q.value = 0.7;
            
            // Connect the audio chain
            this.microphone.connect(this.rumbleFilter);
            this.rumbleFilter.connect(this.humFilter);
            this.humFilter.connect(this.pianoRangeFilter);
            this.pianoRangeFilter.connect(this.highCutFilter);
            this.highCutFilter.connect(this.analyser);
            this.highCutFilter.connect(this.harmonicAnalyser);
            
            // Initialize piano-specific detection parameters
            this.initializePianoDetection();
            
            // Reset pitch tracking
            this.pitchBuffer = [];
            this.noteStabilityCounter = 0;
            this.lastStableNote = null;
            this.lastDetectedNote = null;
            this.silenceCounter = 0;
            
            // Mark as listening
            this.isListening = true;
            
            // Start pitch detection loop
            this.detectPitch();
            
            // Update status
            this.updateStatus('Listening for piano...');
            
            // Show calibration helper
            this.showCalibrationHelper();
            
        } catch (error) {
            console.error('Microphone setup failed:', error);
            
            if (error.name === 'NotAllowedError') {
                this.updateStatus('Microphone access denied', true);
            } else if (error.name === 'NotFoundError') {
                this.updateStatus('No microphone found', true);
            } else {
                this.updateStatus('Microphone error: ' + error.message, true);
            }
            
            setTimeout(() => {
                this.switchInputMethod('virtual');
            }, 2000);
        }
    }
    
    initializePianoDetection() {
        // Piano-specific parameters
        this.pianoDetection = {
            // Frequency range of piano (A0 to C8)
            minFreq: 27.5,
            maxFreq: 4186.0,
            
            // Harmonic characteristics of piano
            expectedHarmonics: [1, 2, 3, 4, 5], // Fundamental + overtones
            harmonicTolerance: 0.05, // 5% frequency tolerance (more lenient)
            minHarmonicsRequired: 2, // Lowered - only need 2 harmonics
            
            // Amplitude envelope characteristics
            minAttackTime: 0.005, // 5ms minimum attack
            maxAttackTime: 0.050, // 50ms maximum attack
            
            // Confidence thresholds
            minPitchConfidence: 0.4, // Lowered for better detection
            minHarmonicRatio: 0.2, // Lowered - less strict on harmonic content
            
            // Noise gate
            noiseFloor: 0.003, // Lowered for more sensitivity
            signalToNoiseRatio: 1.5 // Lowered - signal needs to be only 1.5x noise floor
        };
        
        // Track noise floor
        this.noiseFloorBuffer = new Float32Array(20);
        this.noiseFloorIndex = 0;
    }
    
    detectPitch() {
        if (!this.isListening || !this.analyser) {
            return;
        }
        
        const bufferLength = this.analyser.fftSize;
        const buffer = new Float32Array(bufferLength);
        this.analyser.getFloatTimeDomainData(buffer);
        
        // Calculate RMS for volume detection
        const rms = Math.sqrt(buffer.reduce((sum, val) => sum + val * val, 0) / bufferLength);
        
        // Update noise floor estimate (adaptive noise gate)
        this.updateNoiseFloor(rms);
        const noiseFloor = this.getNoiseFloor();
        
        let detectedPitch = null;
        let confidence = 0;
        
        // LOWERED THRESHOLDS - only need signal slightly above noise
        if (rms > noiseFloor * 1.2 && rms > 0.002) { // Was 1.5x and 0.003
            this.silenceCounter = 0;
            
            // Get pitch using autocorrelation
            const result = this.autocorrelate(buffer, this.audioContext.sampleRate);
            
            if (result && result.frequency > 0 && result.confidence > 0.35) { // Lowered from 0.4
                // Check if frequency is in piano range
                if (result.frequency >= this.pianoDetection.minFreq && 
                    result.frequency <= this.pianoDetection.maxFreq) {
                    
                    // Try harmonic verification but don't require it
                    const isPiano = this.verifyPianoTimbre(result.frequency);
                    
                    // Accept if either piano verified OR high confidence
                    if (isPiano || result.confidence > 0.5) {
                        detectedPitch = result.frequency;
                        confidence = result.confidence;
                        
                        // Add to pitch buffer for smoothing
                        this.pitchBuffer.push(detectedPitch);
                        if (this.pitchBuffer.length > this.pitchBufferSize) {
                            this.pitchBuffer.shift();
                        }
                        
                        // Calculate median pitch for stability
                        const medianPitch = this.getMedian([...this.pitchBuffer]);
                        const midiNote = this.frequencyToMidi(medianPitch);
                        
                        // Check if note is stable
                        if (this.lastDetectedNote === null || Math.abs(this.lastDetectedNote - midiNote) < 0.5) {
                            this.noteStabilityCounter++;
                        } else {
                            this.noteStabilityCounter = 0;
                        }
                        
                        // Trigger note if stable
                        if (this.noteStabilityCounter >= this.noteStabilityThreshold) {
                            const roundedMidiNote = Math.round(midiNote);
                            
                            if (this.lastStableNote !== roundedMidiNote) {
                                // Release previous note
                                if (this.lastStableNote !== null) {
                                    this.game.handleNoteRelease(this.lastStableNote);
                                }
                                
                                // Trigger new note
                                const velocity = Math.min(127, Math.floor(40 + (rms * 400)));
                                this.game.handleNotePress(roundedMidiNote, velocity);
                                this.lastStableNote = roundedMidiNote;
                                
                                const noteName = this.game.midiToNote(roundedMidiNote);
                                this.updateStatus(`Note: ${noteName}`);
                            }
                        }
                        
                        this.lastDetectedNote = midiNote;
                    }
                }
            }
            
        } else {
            this.silenceCounter++;
            
            if (this.silenceCounter > 5 && this.lastStableNote !== null) {
                this.game.handleNoteRelease(this.lastStableNote);
                this.lastStableNote = null;
                this.lastDetectedNote = null;
                this.noteStabilityCounter = 0;
                this.pitchBuffer = [];
                this.updateStatus('Listening...');
            }
        }
        
        // Update debug monitor
        this.updateDebugMonitor(rms, detectedPitch, confidence);
        
        // Continue the detection loop
        requestAnimationFrame(() => {
            this.detectPitch();
        });
    }
    
    updateNoiseFloor(rms) {
        // Track recent quiet moments to establish noise floor
        if (rms < 0.02) { // Only track quiet moments
            this.noiseFloorBuffer[this.noiseFloorIndex] = rms;
            this.noiseFloorIndex = (this.noiseFloorIndex + 1) % this.noiseFloorBuffer.length;
        }
    }
    
    getNoiseFloor() {
        // Get average of recent quiet moments
        const validSamples = this.noiseFloorBuffer.filter(v => v > 0);
        if (validSamples.length === 0) return 0.002; // Lower default
        return validSamples.reduce((a, b) => a + b, 0) / validSamples.length;
    }
    
    verifyPianoTimbre(fundamentalFreq) {
        // SIMPLIFIED harmonic verification - less strict
        if (!this.harmonicAnalyser) return true; // If no harmonic analyser, accept
        
        // Get frequency spectrum
        const binCount = this.harmonicAnalyser.frequencyBinCount;
        const spectrum = new Float32Array(binCount);
        this.harmonicAnalyser.getFloatFrequencyData(spectrum);
        
        const binWidth = this.audioContext.sampleRate / (binCount * 2);
        
        // Find harmonics
        let harmonicsFound = 0;
        
        // Just check for 2-3 harmonics, don't be too strict
        for (let h = 1; h <= 3; h++) {
            const harmonicFreq = fundamentalFreq * h;
            const binIndex = Math.round(harmonicFreq / binWidth);
            
            if (binIndex < binCount) {
                // Check in a window around expected frequency
                const windowSize = 5; // Wider window
                let maxValue = -100;
                
                for (let i = Math.max(0, binIndex - windowSize); 
                     i < Math.min(binCount, binIndex + windowSize); i++) {
                    if (spectrum[i] > maxValue) {
                        maxValue = spectrum[i];
                    }
                }
                
                if (maxValue > -70) { // Lower threshold
                    harmonicsFound++;
                }
            }
        }
        
        // Only need 2 harmonics now
        return harmonicsFound >= 2;
    }
    
    autocorrelate(buffer, sampleRate) {
        // Find a better starting point (first positive zero crossing)
        let start = 0;
        for (let i = 1; i < buffer.length / 2; i++) {
            if (buffer[i-1] < 0 && buffer[i] >= 0) {
                start = i;
                break;
            }
        }
        
        // Piano frequency range limits (A0 to C8)
        const minPeriod = Math.floor(sampleRate / 4186); // C8 ~10 samples
        const maxPeriod = Math.floor(sampleRate / 27.5); // A0 ~1600 samples
        
        // CRITICAL: Limit search range to avoid subharmonics
        // For most piano playing, limit to C2 and above initially
        const practicalMinPeriod = Math.floor(sampleRate / 2000); // ~2000 Hz
        const practicalMaxPeriod = Math.floor(sampleRate / 65); // ~C2 (65 Hz)
        
        let maxCorrelation = 0;
        let bestOffset = -1;
        
        // First pass: Look in practical piano range (C2-C7)
        for (let offset = practicalMinPeriod; offset < practicalMaxPeriod && offset + start < buffer.length / 2; offset++) {
            let correlation = 0;
            let divisor = 0;
            
            const windowSize = Math.min(offset * 2, 1000);
            
            for (let i = 0; i < windowSize; i++) {
                if (start + i + offset < buffer.length) {
                    correlation += buffer[start + i] * buffer[start + i + offset];
                    divisor += buffer[start + i] * buffer[start + i] + 
                              buffer[start + i + offset] * buffer[start + i + offset];
                }
            }
            
            correlation = divisor > 0 ? 2 * correlation / divisor : 0;
            
            if (correlation > maxCorrelation) {
                maxCorrelation = correlation;
                bestOffset = offset;
            }
        }
        
        // If we didn't find a good match, try the extended range
        if (maxCorrelation < 0.4) {
            for (let offset = minPeriod; offset < maxPeriod && offset + start < buffer.length / 2; offset++) {
                // Skip the range we already searched
                if (offset >= practicalMinPeriod && offset < practicalMaxPeriod) continue;
                
                let correlation = 0;
                let divisor = 0;
                
                const windowSize = Math.min(offset * 2, 1000);
                
                for (let i = 0; i < windowSize; i++) {
                    if (start + i + offset < buffer.length) {
                        correlation += buffer[start + i] * buffer[start + i + offset];
                        divisor += buffer[start + i] * buffer[start + i] + 
                                  buffer[start + i + offset] * buffer[start + i + offset];
                    }
                }
                
                correlation = divisor > 0 ? 2 * correlation / divisor : 0;
                
                // Apply stronger bias against very low frequencies
                if (offset > practicalMaxPeriod) {
                    correlation *= 0.8; // Penalize low frequencies
                }
                
                if (correlation > maxCorrelation) {
                    maxCorrelation = correlation;
                    bestOffset = offset;
                }
            }
        }
        
        // Require minimum correlation
        if (bestOffset === -1 || maxCorrelation < 0.35) {
            return null;
        }
        
        // Check for octave errors by looking at half/double periods
        if (bestOffset > 0) {
            // Check if half period has high correlation (octave up)
            const halfPeriod = Math.floor(bestOffset / 2);
            if (halfPeriod >= minPeriod) {
                const halfCorr = this.correlateAt(buffer, start, halfPeriod);
                if (halfCorr > maxCorrelation * 0.9) {
                    // Prefer higher octave if correlation is similar
                    bestOffset = halfPeriod;
                    maxCorrelation = halfCorr;
                }
            }
            
            // Check if 1/3 period has high correlation (detecting 3rd harmonic)
            const thirdPeriod = Math.floor(bestOffset / 3);
            if (thirdPeriod >= minPeriod) {
                const thirdCorr = this.correlateAt(buffer, start, thirdPeriod);
                if (thirdCorr > maxCorrelation * 0.85) {
                    bestOffset = thirdPeriod;
                    maxCorrelation = thirdCorr;
                }
            }
        }
        
        // Refine with parabolic interpolation
        if (bestOffset > minPeriod && bestOffset < maxPeriod - 1) {
            const y1 = this.correlateAt(buffer, start, bestOffset - 1);
            const y2 = maxCorrelation;
            const y3 = this.correlateAt(buffer, start, bestOffset + 1);
            
            const x0 = (y3 - y1) / (2 * (2 * y2 - y1 - y3));
            if (!isNaN(x0) && Math.abs(x0) < 1) {
                bestOffset += x0;
            }
        }
        
        const frequency = sampleRate / bestOffset;
        
        // Final sanity check
        if (frequency < 27.5 || frequency > 4186) {
            return null;
        }
        
        // Cap confidence at 1.0 (100%)
        const confidence = Math.min(maxCorrelation, 1.0);
        
        return {
            frequency: frequency,
            confidence: confidence
        };
    }
    
    correlateAt(buffer, start, offset) {
        let correlation = 0;
        let divisor = 0;
        const windowSize = Math.min(offset, 500);
        
        for (let i = 0; i < windowSize && start + i + offset < buffer.length; i++) {
            correlation += buffer[start + i] * buffer[start + i + offset];
            divisor += buffer[start + i] * buffer[start + i] + 
                      buffer[start + i + offset] * buffer[start + i + offset];
        }
        
        return divisor > 0 ? 2 * correlation / divisor : 0;
    }
    
    getMedian(arr) {
        arr.sort((a, b) => a - b);
        const mid = Math.floor(arr.length / 2);
        return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
    }
    
    frequencyToMidi(frequency) {
        return Math.round(69 + 12 * Math.log2(frequency / 440));
    }
    
    showCalibrationHelper() {
        const existingHelper = document.getElementById('calibrationHelper');
        if (existingHelper) {
            existingHelper.remove();
        }
        
        const helper = document.createElement('div');
        helper.id = 'calibrationHelper';
        helper.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 20, 40, 0.95);
            padding: 12px;
            border-radius: 10px;
            border: 2px solid rgba(0, 255, 255, 0.5);
            text-align: center;
            color: white;
            font-family: 'Orbitron', Arial, sans-serif;
            font-size: 12px;
            z-index: 100;
            max-width: 300px;
        `;
        
        helper.innerHTML = `
            <div style="color: #00ffff; font-weight: bold; margin-bottom: 8px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                ${GameIcons.get('microphone', 16, '#00ffff')} MICROPHONE MODE
            </div>
            <div style="font-size: 11px; opacity: 0.8;">
                Play notes clearly on your piano<br>
                One note at a time works best
            </div>
        `;
        
        document.body.appendChild(helper);
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            if (helper.parentNode) {
                helper.style.transition = 'opacity 0.5s';
                helper.style.opacity = '0';
                setTimeout(() => helper.remove(), 500);
            }
        }, 5000);
    }
    
    disableMicrophone() {
        this.isListening = false;
        
        // Hide calibration helper
        const helper = document.getElementById('calibrationHelper');
        if (helper) {
            helper.remove();
        }
        
        // Hide debug monitor
        if (this.debugMonitor) {
            this.debugMonitor.style.display = 'none';
        }
        
        // Disconnect all audio nodes
        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }
        
        if (this.rumbleFilter) {
            this.rumbleFilter.disconnect();
            this.rumbleFilter = null;
        }
        
        if (this.humFilter) {
            this.humFilter.disconnect();
            this.humFilter = null;
        }
        
        if (this.pianoRangeFilter) {
            this.pianoRangeFilter.disconnect();
            this.pianoRangeFilter = null;
        }
        
        if (this.highCutFilter) {
            this.highCutFilter.disconnect();
            this.highCutFilter = null;
        }
        
        if (this.analyser) {
            this.analyser.disconnect();
            this.analyser = null;
        }
        
        if (this.harmonicAnalyser) {
            this.harmonicAnalyser.disconnect();
            this.harmonicAnalyser = null;
        }
        
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        
        // Clear piano detection parameters
        this.pianoDetection = null;
        this.noiseFloorBuffer = null;
    }
    
    destroy() {
        this.disableCurrentMethod();
        const selector = document.getElementById('inputSelector');
        if (selector) {
            selector.remove();
        }
    }
}

// Main VirtuosoTheory Game Class
class VirtuosoTheory {
    constructor() {
        this.piano = null;
        this.staff = null;
        this.sampler = null;
        this.currentCategory = null;
        this.currentLevel = null;
        this.currentQuestion = null;
        this.questionIndex = 0;
        this.score = 0;
        this.streak = 0;
        this.maxStreak = 0;
        this.timeRemaining = 60;
        this.gameActive = false;
        this.isPaused = false;
        this.timer = null;
        this.pressedKeys = new Set();
        this.expectedNotes = new Set();
        this.playedNotes = new Set();
        this.questionAnswered = false;
        this.categories = [];
        this.gameSettings = {};
        this.gameInitialized = false;
        
        // Mobile detection
        this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        this.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        this.isIPad = /iPad/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
        
        // Touch tracking for multi-touch
        this.activeTouches = new Map();
        
        // Create back button
        this.createBackButton();
        
        // Prevent iOS elastic scrolling
        document.addEventListener('touchmove', (e) => {
            if (e.target.closest('.piano-scroller')) return;
            e.preventDefault();
        }, { passive: false });
        
        this.init();
    }

    async init() {
        this.initializeGame();
    }
    
    createBackButton() {
        const backButton = document.createElement('button');
        backButton.id = 'backButton';
        backButton.innerHTML = '← BACK TO OCLEF STUDIO';
        backButton.title = 'Return to Oclef Studio';
        backButton.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            padding: 12px 24px;
            border-radius: 25px;
            background: linear-gradient(135deg, rgba(0, 20, 40, 0.9) 0%, rgba(0, 40, 60, 0.9) 100%);
            border: 2px solid rgba(0, 255, 255, 0.6);
            color: #00ffff;
            font-size: 13px;
            font-weight: 700;
            font-family: 'Orbitron', Arial, sans-serif;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: 
                0 0 30px rgba(0, 255, 255, 0.4),
                inset 0 0 20px rgba(0, 255, 255, 0.1),
                0 4px 15px rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            white-space: nowrap;
            min-width: 180px;
            text-align: center;
        `;
        
        // Add hover effects
        backButton.addEventListener('mouseenter', () => {
            backButton.style.transform = 'scale(1.05) translateY(-2px)';
            backButton.style.boxShadow = `
                0 0 40px rgba(0, 255, 255, 0.6),
                inset 0 0 30px rgba(0, 255, 255, 0.15),
                0 6px 20px rgba(0, 0, 0, 0.6)
            `;
            backButton.style.borderColor = 'rgba(0, 255, 255, 0.9)';
            backButton.style.background = 'linear-gradient(135deg, rgba(0, 40, 60, 0.95) 0%, rgba(0, 60, 80, 0.95) 100%)';
            backButton.style.color = '#00ffff';
            backButton.style.textShadow = '0 0 15px rgba(0, 255, 255, 0.8)';
        });
        
        backButton.addEventListener('mouseleave', () => {
            backButton.style.transform = 'scale(1) translateY(0)';
            backButton.style.boxShadow = `
                0 0 30px rgba(0, 255, 255, 0.4),
                inset 0 0 20px rgba(0, 255, 255, 0.1),
                0 4px 15px rgba(0, 0, 0, 0.5)
            `;
            backButton.style.borderColor = 'rgba(0, 255, 255, 0.6)';
            backButton.style.background = 'linear-gradient(135deg, rgba(0, 20, 40, 0.9) 0%, rgba(0, 40, 60, 0.9) 100%)';
            backButton.style.textShadow = 'none';
        });
        
        // Add click handler to go back to Oclef Studio
        backButton.addEventListener('click', () => {
            // Navigate back to Oclef Studio
            window.location.href = '../';
        });
        
        // Add to body
        document.body.appendChild(backButton);
        
        // Add mobile-specific styling
        if (this.isMobile) {
            backButton.style.fontSize = '11px';
            backButton.style.padding = '10px 18px';
            backButton.style.minWidth = '150px';
        }
    }
    
    async initializeGame() {
        // Prevent duplicate initialization
        if (this.gameInitialized) return;
        
        try {
            console.log('Starting game initialization...');
            
            // Show click/tap to start screen - required for AudioContext on all modern browsers
            await this.showTapToStart();
            
            // Request wake lock on mobile to prevent screen sleep
            if ('wakeLock' in navigator && this.isMobile) {
                try {
                    await navigator.wakeLock.request('screen');
                } catch (err) {
                    console.log('Wake Lock error:', err);
                }
            }
            
            this.updateLoadingProgress(10);
            
            // Load quiz levels from JSON
            await this.loadLevels();
            this.updateLoadingProgress(25);
            
            // Initialize audio
            await this.initAudio();
            this.updateLoadingProgress(40);
            
            // Initialize piano
            this.initPiano();
            this.updateLoadingProgress(55);
            
            // Initialize staff
            this.initStaff();
            this.updateLoadingProgress(70);
            
            // Initialize input manager
            this.inputManager = new InputManager(this);
            this.updateLoadingProgress(85);
            
            // Setup event listeners
            this.setupEventListeners();
            this.updateLoadingProgress(95);
            
            // Mark as initialized
            this.gameInitialized = true;
            
            this.updateLoadingProgress(100);
            
            // Hide loading screen
            setTimeout(() => {
                document.getElementById('loadingScreen').classList.add('hidden');
            }, 500);
            
            // Initialize grid
            this.drawGrid();
            
            // Set up resize handling
            window.addEventListener('resize', () => {
                this.drawGrid();
            });
            
        } catch (error) {
            console.error('Game initialization failed:', error);
            this.showError(error.message);
        }
    }
    
    showError(message) {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.innerHTML = `
                <div class="loading-title">INITIALIZATION ERROR</div>
                <div style="color: #ff0066; margin-top: 20px; padding: 20px;">
                    Failed to load game resources.<br>
                    Error: ${message}<br><br>
                    Please refresh the page to try again.
                </div>
            `;
        }
    }

    updateLoadingProgress(percent) {
        const progress = document.getElementById('loadingProgress');
        if (progress) {
            progress.style.width = percent + '%';
        }
    }

    async showTapToStart() {
        return new Promise((resolve) => {
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                const startText = this.isMobile || this.isIPad ? 'TAP TO START' : 'CLICK TO START';
                loadingScreen.innerHTML = `
                    <div class="loading-title">VIRTUOSO THEORY</div>
                    <div style="color: #00ffff; font-size: 18px; margin-top: 30px; animation: pulse 1.5s ease-in-out infinite;">
                        ${startText}
                    </div>
                    <div style="color: rgba(255,255,255,0.6); font-size: 12px; margin-top: 10px;">
                        Audio requires user interaction to start
                    </div>
                `;
                
                const tapHandler = async (e) => {
                    e.preventDefault();
                    loadingScreen.removeEventListener('click', tapHandler);
                    loadingScreen.removeEventListener('touchstart', tapHandler);
                    
                    // Restore loading bar
                    loadingScreen.innerHTML = `
                        <div class="loading-title">VIRTUOSO THEORY</div>
                        <div class="loading-bar">
                            <div id="loadingProgress"></div>
                        </div>
                    `;
                    
                    resolve();
                };
                
                loadingScreen.addEventListener('click', tapHandler);
                loadingScreen.addEventListener('touchstart', tapHandler, { passive: false });
            } else {
                resolve();
            }
        });
    }
    
    async loadLevels() {
        try {
            // Use the embedded data from window.QUIZ_DATA
            if (window.QUIZ_DATA) {
                const data = window.QUIZ_DATA;
                this.categories = data.categories || [];
                this.gameSettings = data.settings || {
                    scorePerCorrect: 10,
                    streakBonus: 2,
                    feedbackDuration: 1000,
                    defaultDifficulty: 1,
                    unlockNextLevelAt: 80
                };
                
                console.log(`Loaded ${this.categories.length} categories with settings`);
            } else {
                throw new Error('Quiz data not found');
            }
            
        } catch (error) {
            console.error('Error loading levels:', error);
            // Fallback to basic levels if data fails
            this.categories = this.getFallbackCategories();
        }
    }
    
    getFallbackCategories() {
        return [
            {
                id: 'note-identification',
                name: 'Note Identification',
                description: 'Master reading notes',
                icon: 'note',
                levels: [
                    {
                        id: 'basic',
                        name: 'Basic Notes',
                        description: 'C Major Scale',
                        difficulty: 1,
                        timeLimit: 60,
                        targetScore: 100,
                        questions: [
                            { note: 'C4', type: 'single' },
                            { note: 'D4', type: 'single' },
                            { note: 'E4', type: 'single' },
                            { note: 'F4', type: 'single' },
                            { note: 'G4', type: 'single' },
                            { note: 'A4', type: 'single' },
                            { note: 'B4', type: 'single' },
                            { note: 'C5', type: 'single' }
                        ]
                    }
                ]
            }
        ];
    }
    
    async initAudio() {
        try {
            // Ensure Tone.js is loaded
            if (typeof Tone === 'undefined') {
                throw new Error('Tone.js not loaded');
            }
            
            // Start Tone.js - this requires user interaction on mobile
            await Tone.start();
            console.log('Tone.js started successfully');
            
            // Load your actual piano samples
            const sampleUrls = {
                "A0": "A0.mp3",
                "C1": "C1.mp3", "Eb1": "Eb1.mp3", "Gb1": "Gb1.mp3",
                "A1": "A1.mp3",
                "C2": "C2.mp3", "Eb2": "Eb2.mp3", "Gb2": "Gb2.mp3",
                "A2": "A2.mp3",
                "C3": "C3.mp3", "Eb3": "Eb3.mp3", "Gb3": "Gb3.mp3",
                "A3": "A3.mp3",
                "C4": "C4.mp3", "Eb4": "Eb4.mp3", "Gb4": "Gb4.mp3",
                "A4": "A4.mp3",
                "C5": "C5.mp3", "Eb5": "Eb5.mp3", "Gb5": "Gb5.mp3",
                "A5": "A5.mp3",
                "C6": "C6.mp3", "Eb6": "Eb6.mp3", "Gb6": "Gb6.mp3",
                "A6": "A6.mp3",
                "C7": "C7.mp3", "Eb7": "Eb7.mp3", "Gb7": "Gb7.mp3",
                "A7": "A7.mp3",
                "C8": "C8.mp3"
            };
            
            // Create sampler with your piano samples
            await new Promise((resolve, reject) => {
                this.sampler = new Tone.Sampler({
                    urls: sampleUrls,
                    baseUrl: "./assets/audio/piano/",
                    onload: () => {
                        console.log('Piano samples loaded successfully');
                        resolve();
                    },
                    onerror: (error) => {
                        console.warn('Some samples failed to load:', error);
                        // Don't reject - continue with partial samples
                        resolve();
                    }
                }).toDestination();
                
                // Timeout after 10 seconds on mobile, 30 seconds on desktop
                setTimeout(() => {
                    console.log('Sample loading timeout - continuing with loaded samples');
                    resolve();
                }, this.isMobile ? 10000 : 30000);
            });
            
            // Add reverb for richer sound
            if (!this.isMobile) {
                // Full reverb for desktop
                const reverb = new Tone.Reverb({
                    decay: 2.5,
                    wet: 0.15
                }).toDestination();
                this.sampler.connect(reverb);
            } else {
                // Lighter reverb for mobile performance
                const reverb = new Tone.Reverb({
                    decay: 1.5,
                    wet: 0.08
                }).toDestination();
                this.sampler.connect(reverb);
            }
            
            console.log('Audio initialization complete with piano samples');
            
        } catch (error) {
            console.error('Audio initialization error, using synthesized fallback:', error);
            // Fallback to synthesized piano only if samples completely fail
            this.sampler = new Tone.PolySynth(Tone.Synth, {
                volume: -8,
                oscillator: { type: 'triangle' },
                envelope: {
                    attack: 0.002,
                    decay: 0.1,
                    sustain: 0.3,
                    release: 0.8
                }
            }).toDestination();
        }
    }

    initPiano() {
        const pianoWrapper = document.getElementById('pianoWrapper');
        const piano = document.getElementById('piano');
        
        piano.innerHTML = '';
        
        // Reduced range for mobile
        const startNote = this.isMobile ? 'C3' : 'C2';
        const endNote = this.isMobile ? 'C5' : 'C6';
        
        const noteToMidi = {
            'C2': 36, 'C#2': 37, 'D2': 38, 'D#2': 39, 'E2': 40, 'F2': 41, 'F#2': 42, 'G2': 43, 'G#2': 44, 'A2': 45, 'A#2': 46, 'B2': 47,
            'C3': 48, 'C#3': 49, 'D3': 50, 'D#3': 51, 'E3': 52, 'F3': 53, 'F#3': 54, 'G3': 55, 'G#3': 56, 'A3': 57, 'A#3': 58, 'B3': 59,
            'C4': 60, 'C#4': 61, 'D4': 62, 'D#4': 63, 'E4': 64, 'F4': 65, 'F#4': 66, 'G4': 67, 'G#4': 68, 'A4': 69, 'A#4': 70, 'B4': 71,
            'C5': 72, 'C#5': 73, 'D5': 74, 'D#5': 75, 'E5': 76, 'F5': 77, 'F#5': 78, 'G5': 79, 'G#5': 80, 'A5': 81, 'A#5': 82, 'B5': 83,
            'C6': 84
        };
        
        const midiToNote = {};
        Object.entries(noteToMidi).forEach(([note, midi]) => {
            midiToNote[midi] = note;
        });
        
        const startMidi = noteToMidi[startNote];
        const endMidi = noteToMidi[endNote];
        
        const allNotes = [];
        for (let midi = startMidi; midi <= endMidi; midi++) {
            const fullNote = midiToNote[midi];
            if (fullNote) {
                const noteName = fullNote.includes('#') ? fullNote.slice(0, 2) : fullNote[0];
                const octave = fullNote[fullNote.length - 1];
                const isBlack = fullNote.includes('#');
                
                allNotes.push({
                    note: noteName,
                    octave: octave,
                    midi: midi,
                    type: isBlack ? 'black' : 'white',
                    fullNote: fullNote
                });
            }
        }
        
        // Smaller keys for mobile
        const whiteKeyCount = allNotes.filter(n => n.type === 'white').length;
        const whiteKeyWidth = this.isMobile ? 32 : 45;
        const whiteKeyHeight = this.isMobile ? 100 : 198;
        const blackKeyWidth = whiteKeyWidth * 0.6;
        const blackKeyHeight = whiteKeyHeight * 0.65;
        
        const totalPianoWidth = whiteKeyCount * whiteKeyWidth;
        piano.style.width = totalPianoWidth + 'px';
        piano.style.minHeight = whiteKeyHeight + 'px';
        piano.style.position = 'relative';
        
        // Store dimensions for scaling
        this.pianoWidth = totalPianoWidth;
        
        const midiToWhiteIndex = {};
        let currentWhiteIndex = 0;
        
        allNotes.forEach(noteInfo => {
            if (noteInfo.type === 'white') {
                midiToWhiteIndex[noteInfo.midi] = currentWhiteIndex;
                currentWhiteIndex++;
            }
        });
        
        allNotes.forEach(noteInfo => {
            const key = document.createElement('div');
            key.className = `key ${noteInfo.type}`;
            key.dataset.note = noteInfo.fullNote;
            key.dataset.midi = noteInfo.midi;
            
            if (noteInfo.fullNote === 'C4') {
                key.classList.add('middle-c-key');
                
                const marker = document.createElement('div');
                marker.className = 'middle-c-marker';
                marker.textContent = 'C4';
                key.appendChild(marker);
            }
            
            if (noteInfo.type === 'white') {
                const whiteIndex = midiToWhiteIndex[noteInfo.midi];
                key.style.position = 'absolute';
                key.style.left = (whiteIndex * whiteKeyWidth) + 'px';
                key.style.width = whiteKeyWidth + 'px';
                key.style.height = whiteKeyHeight + 'px';
                key.style.zIndex = '1';
            } else {
                key.style.width = blackKeyWidth + 'px';
                key.style.height = blackKeyHeight + 'px';
                key.style.zIndex = '10';
                
                let leftWhiteIndex = -1;
                for (let midi = noteInfo.midi - 1; midi >= startMidi; midi--) {
                    if (midiToWhiteIndex.hasOwnProperty(midi)) {
                        leftWhiteIndex = midiToWhiteIndex[midi];
                        break;
                    }
                }
                
                if (leftWhiteIndex >= 0) {
                    const leftPosition = ((leftWhiteIndex + 1) * whiteKeyWidth) - (blackKeyWidth / 2);
                    key.style.position = 'absolute';
                    key.style.left = leftPosition + 'px';
                }
            }
            
            piano.appendChild(key);
            
            // Touch event handlers for mobile
            if (this.isMobile || this.isIPad) {
                key.addEventListener('touchstart', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    for (let touch of e.changedTouches) {
                        this.activeTouches.set(touch.identifier, noteInfo.midi);
                        this.handleNotePress(noteInfo.midi, 85);
                    }
                }, { passive: false });
                
                key.addEventListener('touchend', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    for (let touch of e.changedTouches) {
                        const midi = this.activeTouches.get(touch.identifier);
                        if (midi) {
                            this.handleNoteRelease(midi);
                            this.activeTouches.delete(touch.identifier);
                        }
                    }
                }, { passive: false });
                
                key.addEventListener('touchcancel', (e) => {
                    e.preventDefault();
                    for (let touch of e.changedTouches) {
                        const midi = this.activeTouches.get(touch.identifier);
                        if (midi) {
                            this.handleNoteRelease(midi);
                            this.activeTouches.delete(touch.identifier);
                        }
                    }
                }, { passive: false });
                
                key.addEventListener('contextmenu', (e) => {
                    e.preventDefault();
                    return false;
                });
            }
            
            // Mouse events for desktop
            if (!this.isMobile) {
                key.addEventListener('mousedown', (e) => {
                    e.preventDefault();
                    this.handleNotePress(noteInfo.midi, 100);
                });
                
                key.addEventListener('mouseup', () => {
                    this.handleNoteRelease(noteInfo.midi);
                });
                
                key.addEventListener('mouseleave', () => {
                    this.handleNoteRelease(noteInfo.midi);
                });
            }
        });
        
        this.piano = piano;
        
        // Auto-scroll to center on C4
        setTimeout(() => {
            const scroller = document.querySelector('.piano-scroller');
            const middleC = piano.querySelector('.middle-c-key');
            if (scroller && middleC) {
                const scrollLeft = middleC.offsetLeft - (scroller.clientWidth / 2) + (middleC.offsetWidth / 2);
                scroller.scrollLeft = scrollLeft;
            }
        }, 100);
    }

    noteToMidi(note) {
        const noteMap = { 'C': 0, 'D': 2, 'E': 4, 'F': 5, 'G': 7, 'A': 9, 'B': 11 };
        const noteName = note[0];
        const octave = parseInt(note[note.length - 1]);
        const hasSharp = note.includes('#');
        const hasFlat = note.includes('b');
        
        let midiValue = (octave + 1) * 12 + noteMap[noteName];
        
        if (hasSharp) {
            midiValue += 1;
        }
        
        if (hasFlat) {
            midiValue -= 1;
        }
        
        return Math.max(0, Math.min(127, midiValue));
    }

    midiToNote(midi) {
        const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const octave = Math.floor(midi / 12) - 1;
        const noteIndex = midi % 12;
        return noteNames[noteIndex] + octave;
    }

    handleNotePress(midiNote, velocity = 80) {
        const noteStr = this.midiToNote(midiNote);
        const key = this.piano.querySelector(`[data-note="${noteStr}"]`);
        if (key) {
            key.classList.add('active');
        }
        
        const velocityNorm = velocity / 127;
        
        // Vibration feedback on mobile
        if (this.isMobile && navigator.vibrate) {
            navigator.vibrate(10);
        }
        
        this.sampler.triggerAttack(Tone.Frequency(midiNote, "midi"), undefined, velocityNorm);
        
        if (this.gameActive && !this.isPaused && this.currentQuestion && !this.questionAnswered) {
            this.playedNotes.add(midiNote);

            // Check if we've completed the current question
            if (this.currentQuestion.type === 'single') {
                if (this.expectedNotes.has(midiNote)) {
                    this.handleCorrectAnswer();
                } else {
                    this.handleIncorrectAnswer();
                }
            } else if (['dyad', 'triad', 'seventh'].includes(this.currentQuestion.type)) {
                // For chords, check if all notes are pressed
                let allNotesPlayed = true;
                for (let note of this.expectedNotes) {
                    if (!this.playedNotes.has(note)) {
                        allNotesPlayed = false;
                        break;
                    }
                }

                if (allNotesPlayed) {
                    this.handleCorrectAnswer();
                } else if (!this.expectedNotes.has(midiNote)) {
                    // Wrong note in chord
                    this.handleIncorrectAnswer();
                }
            }
        }
    }

    handleNoteRelease(midiNote) {
        const noteStr = this.midiToNote(midiNote);
        const key = this.piano.querySelector(`[data-note="${noteStr}"]`);
        if (key) {
            key.classList.remove('active');
        }
        
        this.sampler.triggerRelease(Tone.Frequency(midiNote, "midi"));
        this.playedNotes.delete(midiNote);
    }

    initStaff() {
        const svg = document.getElementById('staff-svg');
        svg.innerHTML = '';
        
        const container = svg.parentElement;
        const width = 900;
        const height = 320;
        
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
        
        const lineSpacing = 20;
        const staffHeight = lineSpacing * 4;
        const fixedGapBetweenStaves = 50;
        const totalStaffHeight = staffHeight * 2 + fixedGapBetweenStaves;
        
        const verticalCenter = height / 2;
        const staffGroupTop = verticalCenter - (totalStaffHeight / 2) + 15;
        
        const trebleY = staffGroupTop + (staffHeight / 2);
        const bassY = trebleY + staffHeight + fixedGapBetweenStaves;
        
        this.staff = {
            svg,
            width,
            height,
            trebleY,
            bassY,
            lineSpacing,
            noteX: width / 2
        };
        
        const lineStartX = width * 0.08;
        const lineEndX = width * 0.92;
        
        // Draw treble staff lines
        for (let i = -2; i <= 2; i++) {
            const y = trebleY + (i * lineSpacing);
            this.drawStaffLine(svg, lineStartX, y, lineEndX, y);
        }
        
        // Draw bass staff lines
        for (let i = -2; i <= 2; i++) {
            const y = bassY + (i * lineSpacing);
            this.drawStaffLine(svg, lineStartX, y, lineEndX, y);
        }
        
        this.drawTrebleClef(svg, lineStartX + 40, trebleY);
        this.drawBassClef(svg, lineStartX + 40, bassY);
        this.drawBrace(svg, lineStartX - 5, trebleY - 40, bassY + 40);
    }

    drawStaffLine(svg, x1, y1, x2, y2) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.8)');
        line.setAttribute('stroke-width', '4');
        line.style.filter = 'drop-shadow(0 0 5px rgba(0, 255, 255, 0.5))';
        svg.appendChild(line);
    }

    drawTrebleClef(svg, x, y) {
        const clefChar = '𝄞';
        const actualSize = this.staff.lineSpacing * 8.5;
        const clefY = y + this.staff.lineSpacing * 2.8;
        
        for (let i = 3; i > 0; i--) {
            const glowText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            glowText.setAttribute('x', x);
            glowText.setAttribute('y', clefY);
            glowText.setAttribute('font-size', actualSize + (i * 4));
            glowText.setAttribute('fill', '#00ffff');
            glowText.setAttribute('text-anchor', 'middle');
            glowText.setAttribute('opacity', 0.15);
            glowText.style.filter = `blur(${i * 4}px)`;
            glowText.textContent = clefChar;
            svg.appendChild(glowText);
        }
        
        const mainClef = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        mainClef.setAttribute('x', x);
        mainClef.setAttribute('y', clefY);
        mainClef.setAttribute('font-size', actualSize);
        mainClef.setAttribute('fill', '#00ffff');
        mainClef.setAttribute('text-anchor', 'middle');
        mainClef.setAttribute('dominant-baseline', 'auto');
        mainClef.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 255, 1))';
        mainClef.textContent = clefChar;
        svg.appendChild(mainClef);
    }

    drawBassClef(svg, x, y) {
        const clefChar = '𝄢';
        const actualSize = this.staff.lineSpacing * 5.2;
        const clefY = y + this.staff.lineSpacing * 1.3;
        
        for (let i = 2; i > 0; i--) {
            const glowText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            glowText.setAttribute('x', x + 5);
            glowText.setAttribute('y', clefY);
            glowText.setAttribute('font-size', actualSize + (i * 2));
            glowText.setAttribute('fill', '#00ffff');
            glowText.setAttribute('text-anchor', 'middle');
            glowText.setAttribute('opacity', 0.15);
            glowText.style.filter = `blur(${i * 3}px)`;
            glowText.textContent = clefChar;
            svg.appendChild(glowText);
        }
        
        const mainClef = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        mainClef.setAttribute('x', x + 5);
        mainClef.setAttribute('y', clefY);
        mainClef.setAttribute('font-size', actualSize);
        mainClef.setAttribute('fill', '#00ffff');
        mainClef.setAttribute('text-anchor', 'middle');
        mainClef.setAttribute('dominant-baseline', 'auto');
        mainClef.style.filter = 'drop-shadow(0 0 15px rgba(0, 255, 255, 1))';
        mainClef.textContent = clefChar;
        svg.appendChild(mainClef);
    }

    drawBrace(svg, x, topY, bottomY) {
        const neonPink = '#ff00ff';
        const leftLineX = x - 20;
        const rightLineX = x - 8;
        
        const braceGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        
        for (let i = 3; i > 0; i--) {
            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            glow.setAttribute('x1', leftLineX);
            glow.setAttribute('y1', topY);
            glow.setAttribute('x2', leftLineX);
            glow.setAttribute('y2', bottomY);
            glow.setAttribute('stroke', neonPink);
            glow.setAttribute('stroke-width', 8 * i);
            glow.setAttribute('opacity', 0.1 * (4 - i) / 2);
            glow.style.filter = `blur(${i * 2}px)`;
            braceGroup.appendChild(glow);
        }
        
        const leftLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        leftLine.setAttribute('x1', leftLineX);
        leftLine.setAttribute('y1', topY);
        leftLine.setAttribute('x2', leftLineX);
        leftLine.setAttribute('y2', bottomY);
        leftLine.setAttribute('stroke', '#ffffff');
        leftLine.setAttribute('stroke-width', '4');
        leftLine.setAttribute('opacity', '0.9');
        braceGroup.appendChild(leftLine);
        
        for (let i = 3; i > 0; i--) {
            const glow = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            glow.setAttribute('x1', rightLineX);
            glow.setAttribute('y1', topY);
            glow.setAttribute('x2', rightLineX);
            glow.setAttribute('y2', bottomY);
            glow.setAttribute('stroke', neonPink);
            glow.setAttribute('stroke-width', 8 * i);
            glow.setAttribute('opacity', 0.1 * (4 - i) / 2);
            glow.style.filter = `blur(${i * 2}px)`;
            braceGroup.appendChild(glow);
        }
        
        const rightLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        rightLine.setAttribute('x1', rightLineX);
        rightLine.setAttribute('y1', topY);
        rightLine.setAttribute('x2', rightLineX);
        rightLine.setAttribute('y2', bottomY);
        rightLine.setAttribute('stroke', '#ffffff');
        rightLine.setAttribute('stroke-width', '4');
        rightLine.setAttribute('opacity', '0.9');
        braceGroup.appendChild(rightLine);
        
        svg.appendChild(braceGroup);
    }

    displayNotesOnStaff(notes) {
        // Clear existing notes
        const existingNotes = this.staff.svg.querySelectorAll('.staff-note, .staff-note-glow, .ledger-line');
        existingNotes.forEach(el => el.remove());
        
        if (!Array.isArray(notes)) {
            notes = [notes];
        }
        
        // Calculate positions for all notes
        const noteData = notes.map(note => {
            const midi = this.noteToMidi(note);
            const position = this.calculateNotePosition(note, midi);
            return {
                note: note,
                midi: midi,
                position: position,
                y: position.y
            };
        });
        
        // Sort notes by pitch (lowest to highest) for proper stacking
        noteData.sort((a, b) => a.midi - b.midi);
        
        // For chords, all notes share the same x position
        const x = this.staff.noteX;
        
        // Check for very close notes (seconds) that need slight horizontal offset
        const offsetMap = new Map();
        for (let i = 0; i < noteData.length; i++) {
            offsetMap.set(i, 0); // Default no offset
            
            // Check if this note is very close to any previous note
            for (let j = 0; j < i; j++) {
                const yDiff = Math.abs(noteData[i].y - noteData[j].y);
                // If notes are within half a line spacing, they need offset
                if (yDiff < this.staff.lineSpacing * 0.75) {
                    // Offset every other close note to the right
                    offsetMap.set(i, 15);
                    break;
                }
            }
        }
        
        // Draw ledger lines for all notes that need them
        const ledgerYPositions = new Set();
        noteData.forEach(data => {
            if (data.position.needsLedger || data.position.staff === 'middle') {
                // Track which Y positions need ledger lines
                if (data.position.staff === 'middle') {
                    ledgerYPositions.add(data.position.y);
                } else {
                    // Calculate all ledger line positions this note needs
                    const staffTop = (data.position.staff === 'treble' ? this.staff.trebleY : this.staff.bassY) - this.staff.lineSpacing * 2;
                    const staffBottom = (data.position.staff === 'treble' ? this.staff.trebleY : this.staff.bassY) + this.staff.lineSpacing * 2;
                    
                    if (data.position.y < staffTop) {
                        let currentY = staffTop - this.staff.lineSpacing;
                        while (currentY >= data.position.y - this.staff.lineSpacing/2) {
                            if (Math.abs(currentY - data.position.y) < this.staff.lineSpacing/4 || currentY > data.position.y) {
                                ledgerYPositions.add(currentY);
                            }
                            currentY -= this.staff.lineSpacing;
                        }
                    }
                    
                    if (data.position.y > staffBottom) {
                        let currentY = staffBottom + this.staff.lineSpacing;
                        while (currentY <= data.position.y + this.staff.lineSpacing/2) {
                            if (Math.abs(currentY - data.position.y) < this.staff.lineSpacing/4 || currentY < data.position.y) {
                                ledgerYPositions.add(currentY);
                            }
                            currentY += this.staff.lineSpacing;
                        }
                    }
                }
            }
        });
        
        // Draw ledger lines (only once per Y position)
        const lineLength = 50; // Slightly wider for chords
        ledgerYPositions.forEach(y => {
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            line.setAttribute('x1', x - lineLength / 2);
            line.setAttribute('y1', y);
            line.setAttribute('x2', x + lineLength / 2);
            line.setAttribute('y2', y);
            line.setAttribute('stroke', 'rgba(255, 255, 255, 0.6)');
            line.setAttribute('stroke-width', '2');
            line.classList.add('ledger-line');
            this.staff.svg.appendChild(line);
        });
        
        // Draw accidentals first (to the left of the note stack)
        let accidentalOffset = 0;
        noteData.forEach((data, index) => {
            const noteX = x + offsetMap.get(index);
            
            if (data.note.includes('#')) {
                this.drawAccidental('♯', noteX - 30 - accidentalOffset, data.position.y);
                accidentalOffset += 15; // Stack accidentals horizontally if multiple
            } else if (data.note.includes('b')) {
                this.drawAccidental('♭', noteX - 30 - accidentalOffset, data.position.y);
                accidentalOffset += 15;
            }
        });
        
        // Draw the notes
        noteData.forEach((data, index) => {
            const noteX = x + offsetMap.get(index);
            
            // Glow circle
            const glowCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            glowCircle.setAttribute('cx', noteX);
            glowCircle.setAttribute('cy', data.position.y);
            glowCircle.setAttribute('rx', '15');
            glowCircle.setAttribute('ry', '12');
            glowCircle.classList.add('staff-note-glow');
            this.staff.svg.appendChild(glowCircle);
            
            // Note circle
            const noteCircle = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
            noteCircle.setAttribute('cx', noteX);
            noteCircle.setAttribute('cy', data.position.y);
            noteCircle.setAttribute('rx', '10');
            noteCircle.setAttribute('ry', '8');
            noteCircle.classList.add('staff-note');
            noteCircle.style.transform = 'rotate(-20deg)';
            noteCircle.style.transformOrigin = `${noteX}px ${data.position.y}px`;
            this.staff.svg.appendChild(noteCircle);
        });
        
        // Draw a stem if it's a chord (optional - you can remove this if you don't want stems)
        if (notes.length > 1) {
            const topNote = noteData[noteData.length - 1];
            const bottomNote = noteData[0];
            const stemX = x + 10; // Right side of noteheads
            const stemStartY = bottomNote.position.y;
            const stemEndY = topNote.position.y - 40; // Extend stem above top note
            
            const stem = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            stem.setAttribute('x1', stemX);
            stem.setAttribute('y1', stemStartY);
            stem.setAttribute('x2', stemX);
            stem.setAttribute('y2', stemEndY);
            stem.setAttribute('stroke', 'rgba(255, 255, 255, 0.8)');
            stem.setAttribute('stroke-width', '3');
            stem.classList.add('staff-note');
            this.staff.svg.appendChild(stem);
        }
    }

    calculateNotePosition(note, midi) {
        const baseNoteName = note[0];
        const octave = parseInt(note[note.length - 1]);
        
        let y, staff, needsLedger;
        
        if (midi === 60) {
            // Middle C
            y = (this.staff.trebleY + (this.staff.lineSpacing * 2) + this.staff.bassY - (this.staff.lineSpacing * 2)) / 2;
            staff = 'middle';
            needsLedger = true;
        } else if (midi > 60) {
            // Treble clef notes
            const baseNoteSteps = this.naturalNoteToStaffSteps(baseNoteName, octave);
            const e4Steps = this.naturalNoteToStaffSteps('E', 4);
            const stepsFromE4 = baseNoteSteps - e4Steps;
            
            y = this.staff.trebleY + (this.staff.lineSpacing * 2) - (stepsFromE4 * this.staff.lineSpacing / 2);
            staff = 'treble';
            needsLedger = (midi <= 62 || midi >= 79);
        } else {
            // Bass clef notes
            const baseNoteSteps = this.naturalNoteToStaffSteps(baseNoteName, octave);
            const g2Steps = this.naturalNoteToStaffSteps('G', 2);
            const stepsFromG2 = baseNoteSteps - g2Steps;
            
            y = this.staff.bassY + (this.staff.lineSpacing * 2) - (stepsFromG2 * this.staff.lineSpacing / 2);
            staff = 'bass';
            needsLedger = (midi <= 41 || midi >= 59);
        }
        
        return { y, staff, needsLedger };
    }

    naturalNoteToStaffSteps(noteName, octave) {
        const staffPositions = {
            'C': 0, 'D': 1, 'E': 2, 'F': 3, 'G': 4, 'A': 5, 'B': 6
        };
        return (octave * 7) + staffPositions[noteName];
    }

    drawAccidental(symbol, x, y) {
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 8);
        text.setAttribute('font-size', '32');
        text.setAttribute('fill', '#ff00ff');
        text.setAttribute('text-anchor', 'middle');
        text.style.filter = 'drop-shadow(0 0 5px rgba(255, 0, 255, 0.6))';
        text.textContent = symbol;
        text.classList.add('staff-note');
        this.staff.svg.appendChild(text);
    }

    populateCategorySelect() {
        const grid = document.getElementById('categoryGrid');
        grid.innerHTML = '';
        
        this.categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'category-card';
            // Get icon - support both icon names and legacy emojis
            const iconMap = { 'note': 'note', 'piano': 'piano', 'score': 'score', 'hand': 'hand', 'trophy': 'trophy', '🎵': 'note', '🎹': 'piano', '🎼': 'score', '✋': 'hand', '🏆': 'trophy' };
            const iconName = iconMap[category.icon] || 'note';
            const iconSvg = GameIcons.get(iconName, 32, '#00ffff');
            card.innerHTML = `
                <div class="category-icon" style="display: flex; justify-content: center; align-items: center;">${iconSvg}</div>
                <div class="category-name">${category.name}</div>
                <div class="category-desc">${category.description}</div>
                <div class="category-desc" style="margin-top: 5px; color: #00ff88;">
                    ${category.levels.length} levels
                </div>
            `;
            card.addEventListener('click', () => this.selectCategory(category));
            grid.appendChild(card);
        });
    }

    selectCategory(category) {
        this.currentCategory = category;
        this.closeCategoryModal();
        this.openLevelModal();
    }

    populateLevelSelect() {
        const grid = document.getElementById('levelGrid');
        const title = document.getElementById('levelModalTitle');
        grid.innerHTML = '';
        
        if (this.currentCategory) {
            title.textContent = this.currentCategory.name;
            
            this.currentCategory.levels.forEach(level => {
                const card = document.createElement('div');
                card.className = 'level-card';
                
                // Create difficulty stars
                let stars = '';
                for (let i = 0; i < 5; i++) {
                    if (i < (level.difficulty || 1)) {
                        stars += `<span class="difficulty-star">${GameIcons.get('star', 14, '#ffcc00')}</span>`;
                    } else {
                        stars += `<span class="difficulty-star" style="opacity: 0.3;">${GameIcons.get('starEmpty', 14, '#ffcc00')}</span>`;
                    }
                }
                
                card.innerHTML = `
                    <div class="level-name">${level.name}</div>
                    <div class="level-desc">${level.description}</div>
                    <div class="difficulty-indicator">${stars}</div>
                    <div class="level-desc" style="margin-top: 5px;">
                        Time: ${level.timeLimit}s | Target: ${level.targetScore || 100}
                    </div>
                `;
                card.addEventListener('click', () => this.selectLevel(level));
                grid.appendChild(card);
            });
        }
    }

    selectLevel(level) {
        this.currentLevel = level;
        document.getElementById('levelName').textContent = level.name;
        this.closeLevelModal();
        
        const startBtn = document.getElementById('startBtn');
        startBtn.textContent = 'Start Game';
        startBtn.classList.add('primary');
        
        // Add pulsing glow effect to draw attention
        startBtn.style.background = 'linear-gradient(135deg, rgba(0, 255, 255, 0.4) 0%, rgba(0, 200, 255, 0.4) 100%)';
        startBtn.style.borderColor = '#00ffff';
        startBtn.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.6)';
        startBtn.style.transform = 'scale(1.05)';
        
        // Add pulsing animation
        startBtn.style.animation = 'pulseReady 2s ease-in-out infinite';
        
        // Create or update the animation styles
        if (!document.getElementById('readyButtonStyles')) {
            const style = document.createElement('style');
            style.id = 'readyButtonStyles';
            style.textContent = `
                @keyframes pulseReady {
                    0%, 100% {
                        box-shadow: 0 0 30px rgba(0, 255, 255, 0.6),
                                    inset 0 0 20px rgba(0, 255, 255, 0.1);
                        transform: scale(1.05);
                        background: linear-gradient(135deg, rgba(0, 255, 255, 0.4) 0%, rgba(0, 200, 255, 0.4) 100%);
                    }
                    50% {
                        box-shadow: 0 0 50px rgba(0, 255, 255, 0.9),
                                    0 0 80px rgba(0, 255, 255, 0.4),
                                    inset 0 0 30px rgba(0, 255, 255, 0.2);
                        transform: scale(1.08);
                        background: linear-gradient(135deg, rgba(0, 255, 255, 0.5) 0%, rgba(0, 200, 255, 0.5) 100%);
                    }
                }
                
                .control-button.primary.ready-to-start {
                    position: relative;
                    overflow: visible;
                    transition: all 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
        
        startBtn.classList.add('ready-to-start');
        
        document.getElementById('timer').textContent = level.timeLimit;
    }

    openCategoryModal() {
        this.populateCategorySelect();
        document.getElementById('categoryModal').classList.add('active');
    }

    closeCategoryModal() {
        document.getElementById('categoryModal').classList.remove('active');
    }

    openLevelModal() {
        this.populateLevelSelect();
        document.getElementById('levelModal').classList.add('active');
    }

    closeLevelModal() {
        document.getElementById('levelModal').classList.remove('active');
    }

    setupEventListeners() {
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const levelBackBtn = document.getElementById('levelBackBtn');
        
        startBtn.addEventListener('click', () => {
            if (!this.currentLevel) {
                this.openCategoryModal();
            } else {
                this.startGame();
            }
        });
        
        pauseBtn.addEventListener('click', () => this.togglePause());
        
        levelBackBtn.addEventListener('click', () => {
            this.closeLevelModal();
            this.openCategoryModal();
        });
        
        document.getElementById('categoryModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeCategoryModal();
            }
        });
        
        document.getElementById('levelModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeLevelModal();
            }
        });
        
        // Keyboard controls for desktop
        if (!this.isMobile) {
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (document.getElementById('categoryModal').classList.contains('active')) {
                        this.closeCategoryModal();
                    } else if (document.getElementById('levelModal').classList.contains('active')) {
                        this.closeLevelModal();
                    } else if (this.gameActive) {
                        this.togglePause();
                    }
                } else if (e.key === ' ' && !this.gameActive && this.currentLevel) {
                    e.preventDefault();
                    this.startGame();
                }
            });
            
            const keyboardMapping = {
                'a': 60, 's': 62, 'd': 64, 'f': 65, 'g': 67, 'h': 69, 'j': 71, 'k': 72, 'l': 74,
                'w': 61, 'e': 63, 't': 66, 'y': 68, 'u': 70, 'o': 73, 'p': 75
            };
            
            document.addEventListener('keydown', (e) => {
                const key = e.key.toLowerCase();
                if (keyboardMapping[key] && !this.pressedKeys.has(key)) {
                    this.pressedKeys.add(key);
                    this.handleNotePress(keyboardMapping[key], 80);
                }
            });
            
            document.addEventListener('keyup', (e) => {
                const key = e.key.toLowerCase();
                if (keyboardMapping[key] && this.pressedKeys.has(key)) {
                    this.pressedKeys.delete(key);
                    this.handleNoteRelease(keyboardMapping[key]);
                }
            });
        }
        
        // Prevent iOS bounce scrolling
        document.body.addEventListener('touchmove', (e) => {
            if (!e.target.closest('.piano-scroller, .modal-content')) {
                e.preventDefault();
            }
        }, { passive: false });
    }

    startGame() {
        if (!this.currentLevel) {
            this.openCategoryModal();
            return;
        }
        
        this.score = 0;
        this.streak = 0;
        this.questionIndex = 0;
        this.timeRemaining = this.currentLevel.timeLimit;
        this.gameActive = true;
        this.isPaused = false;
        
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
        document.getElementById('timer').textContent = this.timeRemaining;
        
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        // Remove the pulsing animation and reset button styles
        startBtn.classList.remove('ready-to-start');
        startBtn.style.animation = '';
        startBtn.style.transform = '';
        startBtn.style.boxShadow = '';
        startBtn.style.background = '';
        
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'block';
        pauseBtn.disabled = false;
        
        this.shuffleQuestions();
        this.startTimer();
        this.nextQuestion();
    }

    shuffleQuestions() {
        const questions = [...this.currentLevel.questions];
        for (let i = questions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questions[i], questions[j]] = [questions[j], questions[i]];
        }
        this.currentLevel.shuffledQuestions = questions;
    }

    startTimer() {
        this.timer = setInterval(() => {
            if (!this.isPaused) {
                this.timeRemaining--;
                document.getElementById('timer').textContent = this.timeRemaining;
                
                if (this.timeRemaining <= 10) {
                    document.getElementById('timer').classList.add('timer-warning');
                } else {
                    document.getElementById('timer').classList.remove('timer-warning');
                }
                
                if (this.timeRemaining <= 0) {
                    this.endGame();
                }
            }
        }, 1000);
    }

    nextQuestion() {
        if (this.questionIndex >= this.currentLevel.shuffledQuestions.length) {
            this.questionIndex = 0;
            this.shuffleQuestions();
        }
        
        this.currentQuestion = this.currentLevel.shuffledQuestions[this.questionIndex];
        this.questionIndex++;
        
        this.expectedNotes.clear();
        this.playedNotes.clear();
        this.questionAnswered = false;

        // Check if we need to switch input methods for chord levels
        if (this.inputManager) {
            this.inputManager.checkAndSwitchFromMicrophoneIfNeeded();
            this.inputManager.updateButtonStates();
        }
        
        // Set up expected notes based on question type
        if (this.currentQuestion.type === 'single') {
            const midi = this.noteToMidi(this.currentQuestion.note);
            this.expectedNotes.add(midi);
            this.displayNotesOnStaff(this.currentQuestion.note);
            
        } else if (this.currentQuestion.notes) {
            // For dyads, triads, seventh chords
            this.currentQuestion.notes.forEach(note => {
                const midi = this.noteToMidi(note);
                this.expectedNotes.add(midi);
            });
            this.displayNotesOnStaff(this.currentQuestion.notes);
        }
    }

    handleCorrectAnswer() {
        // Prevent duplicate scoring for the same question
        this.questionAnswered = true;

        const baseScore = this.gameSettings.scorePerCorrect || 10;
        const streakBonus = this.gameSettings.streakBonus || 2;

        this.score += baseScore + (this.streak * streakBonus);
        this.streak++;
        this.maxStreak = Math.max(this.maxStreak, this.streak);
        
        document.getElementById('score').textContent = this.score;
        document.getElementById('streak').textContent = this.streak;
        
        this.showFeedback('PERFECT!', true);
        
        // Vibration feedback on mobile
        if (this.isMobile && navigator.vibrate) {
            navigator.vibrate([20, 10, 20]);
        }
        
        setTimeout(() => this.nextQuestion(), this.gameSettings.feedbackDuration || 1000);
    }

    handleIncorrectAnswer() {
        this.streak = 0;
        document.getElementById('streak').textContent = this.streak;
        
        this.showFeedback('Try Again', false);
        
        // Different vibration pattern for incorrect
        if (this.isMobile && navigator.vibrate) {
            navigator.vibrate(50);
        }
    }

    showFeedback(text, isCorrect) {
        const feedback = document.getElementById('feedbackDisplay');
        feedback.textContent = text;
        feedback.className = 'feedback-display ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
        feedback.style.opacity = '1';
        
        setTimeout(() => {
            feedback.style.opacity = '0';
        }, 1000);
    }

    togglePause() {
        if (!this.gameActive) return;
        
        this.isPaused = !this.isPaused;
        document.getElementById('pauseBtn').textContent = this.isPaused ? 'Resume' : 'Pause';
        
        if (this.isPaused) {
            const existingNotes = this.staff.svg.querySelectorAll('.staff-note, .staff-note-glow, .ledger-line');
            existingNotes.forEach(el => el.remove());
        } else {
            if (this.currentQuestion.type === 'single') {
                this.displayNotesOnStaff(this.currentQuestion.note);
            } else if (this.currentQuestion.notes) {
                this.displayNotesOnStaff(this.currentQuestion.notes);
            }
        }
    }

    endGame() {
        this.gameActive = false;
        clearInterval(this.timer);
        
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        
        startBtn.style.display = 'block';
        startBtn.textContent = 'Select Level';
        pauseBtn.style.display = 'none';
        pauseBtn.disabled = true;
        
        this.currentLevel = null;
        this.currentCategory = null;
        document.getElementById('levelName').textContent = 'None';
        document.getElementById('timer').textContent = '--';
        
        const existingNotes = this.staff.svg.querySelectorAll('.staff-note, .staff-note-glow, .ledger-line');
        existingNotes.forEach(el => el.remove());
        
        const targetScore = this.currentLevel?.targetScore || 100;
        const percentage = Math.round((this.score / targetScore) * 100);
        
        this.showFeedback(`Score: ${this.score} (${percentage}%)`, percentage >= 80);
    }

    drawGrid() {
        const canvas = document.getElementById('gridCanvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.1)';
        ctx.lineWidth = 1;
        
        const step = this.isMobile ? 30 : 50;
        
        for (let x = 0; x < canvas.width; x += step) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        
        const horizon = canvas.height * 0.4;
        for (let y = horizon; y < canvas.height; y += step) {
            const progress = (y - horizon) / (canvas.height - horizon);
            ctx.globalAlpha = 0.1 * (1 - progress * 0.5);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    window.game = new VirtuosoTheory();
});