# App - LunarOps: Lunar Surface Operations - Realtime Collaboration

In an effort to enhance the documentation and review process of data collected on the Moon, NASA and the global scientific community are moving towards a system where information is documented and reviewed in real time.

![Lunar Operations Demo](/lunar.gif)

[**View Presentation**](https://docs.google.com/presentation/d/1z9sVrHxx0Tj2et9uzyLw7AVPV8SFRTdY/edit?usp=sharing&ouid=116258337050070476444&rtpof=true&sd=true)


## Current Implementation
During missions, each flight control team member is responsible for creating and maintaining a log that supports their specific job duties. These logs form the official mission record. However, the current system does not allow flight controllers to view each other’s logs in real time or synchronize logs for comparison during or after missions.


## Project Objective
Develop an application capable of integrating and displaying console log information from multiple users (100+ users on the same network) instantly and seamlessly.

![Project Interface](proj_img.png)


## Instructions to run the application
Follow these instructions to get the application running:
1. Install Node.js version 14.21.3:
   - `nvm install v14.21.3`
   - `nvm use v14.21.3`
2. Install necessary packages:
   - `npm install`
3. Start the application:
   - To run the project : `npm start`


## Features
- **Authentication**: Secure access to the application.
- **Real-Time Collaboration**: Allows multiple users to:
  - Create and edit their console logs.
  - View logs made by others within the same network.
- **Enhanced Log Details**:
  - Logs can include messages, images, audio, and video entries.
  - Each entry is timestamped and includes author information and the entry topic.
- **Organized Viewing Options**: 
  - Logs can be viewed and arranged by time, author, and other metadata.
- **Record Integrity**:
  - Users can lock their logs to prevent future edits, ensuring the log serves as an official record.
- **Interactive Features**:
  - Users can tag other log entries within the network.
  - Support for custom commands within the logs.


## Team
`Tanisha` [`Prakhar Kaushik`](https://github.com/PrakharKaushik213) [`Arnav S Roy`](https://github.com/VenomousAtom)