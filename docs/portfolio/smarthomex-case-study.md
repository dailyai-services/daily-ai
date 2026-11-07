# SmartHomeX — Flutter Smart Home Prototype

**A personal IoT and mobile-app prototype exploring smart-home controls, security alerts and home monitoring.**

SmartHomeX explores how a resident could monitor and control selected home devices from a single mobile interface, with a Raspberry Pi serving as the local hardware bridge.

> **Status and honesty note:** This is a personal prototype / development project, not a customer deployment or a published Play Store app. The descriptions below distinguish app-side prototype work, documented hardware planning and features that still require physical integration and validation. No production uptime, security certification or customer results are claimed.

## Product concept

A mobile control centre for a small home setup, with these proposed capability areas:

- Home device controls for lighting, a smart lock and selected appliances.
- Gas / thermal monitoring surfaces and emergency SOS entry points.
- Activity, energy and scene navigation.
- A profile and settings area for device, network, notifications, security, schedules and voice-assistant preferences.
- Voice interaction as an optional hands-free control path.

## Mobile application

**Technology:** Flutter and Dart, with Firebase-oriented authentication/profile work and the speech_to_text package explored for voice input.

The app prototype was structured around:

- Login and account entry.
- Intro / splash experience.
- Main navigation for Home, Scenes, Activity and Energy.
- Home controls for Smart Light, Smart Lock, Gas Detector, Thermal Sensor, SOS and Voice Control.
- A profile screen and a broader settings surface.

These are prototype-level app flows. Before presenting a live demonstration, the current build should be opened on a device and each flow rechecked. Do not assume every control is connected to physical hardware.

## Raspberry Pi and relay integration plan

The hardware design notes use a Raspberry Pi 3B+ and a four-channel relay module. The recorded GPIO mapping is:

| Raspberry Pi GPIO | Relay input | Intended load |
|---|---|---|
| GPIO 17 | IN1 | Living-room light |
| GPIO 18 | IN2 | Living-room fan |
| GPIO 27 | IN3 | Living-room TV |
| GPIO 22 | IN4 | Bedroom light |

This table records the planned pin mapping only. It is not proof that the relay board, mains loads, sensor inputs or end-to-end mobile commands have been physically tested. Any real electrical installation requires appropriate isolation, safe wiring, qualified supervision and fail-safe design. Do not connect mains voltage as a casual prototype exercise.

## Automation experiment

The app-side thermal automation experiment used a periodic timer and simulated person-detection state to demonstrate automatic device-state changes. This is a UI / logic simulation, not a validated presence-detection model or a completed safety system.

## Feature status

| Capability | Current description |
|---|---|
| Flutter mobile UI and navigation | Prototype work |
| Device-control screens | Prototype UI; hardware binding must be verified |
| Firebase / Google sign-in flow | Integration work; verify current build and credentials before demo |
| Voice input | Package-based prototype; verify microphone permissions and device behaviour |
| Thermal / presence automation | Simulated timer-based experiment |
| Raspberry Pi relay pin mapping | Documented design mapping |
| Facial recognition, motion detection, air-quality and health monitoring | Planned / integration scope; not claimed as validated deployments |
| SOS / emergency workflow | UI concept; not a certified emergency response service |
| Play Store / App Store release | Not published |

## What this demonstrates

- Flutter / Dart mobile UI development.
- Breaking a multi-feature product idea into app screens and settings areas.
- Thinking across a mobile client, a Raspberry Pi hardware bridge and relay outputs.
- Separating simulated behaviour from real sensor / hardware integration.
- Awareness that security, electrical safety and emergency workflows need validation before real-world use.

## Possible small-business adaptations

The reusable app-development ideas are relevant to contained, non-safety-critical workflows such as:

- Class and trial-session enquiries for academies.
- Appointment requests and service catalogues.
- Simple staff checklists or internal task logging.
- Customer request status views.

A business should only be offered a native Android app when repeat use justifies an installed app. For occasional enquiries, a responsive website or installable web app is usually the simpler first step.

## Demo readiness checklist

Before sharing this project as a live demo:

1. Build and run the current Flutter project on a physical Android device.
2. Capture real screenshots of the login, home, navigation and settings flows.
3. Label simulated sensor / automation behaviour clearly.
4. Confirm Firebase configuration and remove all test credentials.
5. Verify that no private keys, personal information or real household network details are included.
6. Only show hardware control as working after a safe, supervised end-to-end test.

**No customer engagement, revenue, store publication or production deployment is implied by this case study.**
