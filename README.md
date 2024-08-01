# HULP_APP - Phase 1

An app designed to track menstrual cycles and Narcolepsy Type I.

---

# HULP_APP - Phase 1

## Project Overview

During my internship at Hospital La Paz, I worked on a data collection system divided into three parts, actively participating in the Sleep Unit of the Neurology Department. The first phase of the project involved developing a mobile application compatible with both Android and iOS using React-Native and Expo.

## Mobile Application

### Features

1. **User Account Creation**
   - Users are required to create an account by providing:
     - Email address
     - Password
     - Date of birth
     - Onset date of symptoms
     - Diagnosis date
     - Usual menstrual cycle duration
     - Height
     - Weight
     - Treatment for narcolepsy (optional)

2. **Main Screen**
   - Displays a calendar where users can log menstrual spotting days.
   - Indicates the most fertile days.
   - Internally calculates the four phases of the menstrual cycle: luteal, follicular, ovulatory, and menstruation.
     In this first phase, only the luteal and menstruation dates are calculated.

3. **Symptom Tracking Screens**
   - **Narcolepsy Symptoms Screen**:
     - Allows users to record narcolepsy symptoms including:
       - Cataplexy (facial, extremities, or falling)
       - Nocturnal hallucinations
       - Fragmented sleep
       - Sleep paralysis
       - Hallucinations
       - Sleepiness via the Epworth Sleepiness Scale (adapted for age: under or over 18 years old)
         Initially proposed a visual analog scale of 0-10 for sleepiness, but the professional tutor advised using the Epworth Scale. With its eight questions scored from 0 to 3, totaling a maximum of 24 points, it provides a better analysis of the user's sleepiness.

   - **Additional Symptoms Screen**:
     - Records symptoms not directly associated with Narcolepsy Type I but useful for the study, including:
       - Irritability
       - Breast pain
       - Headache
       - Lower back pain
       - Pelvic pain
       - Fatigue
       - Among others.
     These records can be used to provide a comprehensive view of menstruation-related symptoms that the patient might experience, offering valuable context for the study despite not being specific to the menstrual cycle.

## Technologies Used

- **Frontend**: React-Native, Expo

## How to Use the App

1. **Install Expo**:
   - Make sure you have Expo installed. You can use the Expo Go app on your mobile device or use a simulator on your development machine. Instructions for installation can be found on the [Expo documentation](https://docs.expo.dev/get-started/installation/).

2. **Start the Development Server**:
   - Navigate to the project directory and start the development server using Yarn:

     ```sh
     yarn start
     ```

   - This command will start Expo and provide a QR code for testing on your mobile device, or it will open the app in a simulator.

3. **Run the App on iOS**:
   - To run the app on an iOS simulator, use:

     ```sh
     yarn ios
     ```

   - This command will build and open the app in an iOS simulator, if you have Xcode installed on your machine.

## Next Steps

The second phase of the project involves creating a MySQL database consisting of four tables to store the collected data. The third phase will involve developing a web-app for healthcare professionals or exporting the data to an Excel table for further analysis.

For more details, please refer to the specific documentation for each phase.

---
The second phase can be found in the repository HULP_APP_backend

---
--- 
## Disclaimer

This project was developed in collaboration with **Hospital Universitario La Paz** and **Universidad Politécnica de Madrid**. The code and documentation provided are a result of this collaborative effort and aim to support the ongoing research and clinical work related to menstrual cycle tracking and Narcolepsy Type I.

**Author**: Celia Taboada Martín 

**Academic tutor**: Ignacio Oropesa

**Profesional tutor**: Milagros Merino


