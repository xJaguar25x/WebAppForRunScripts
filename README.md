# WebAppForRunScripts
The purpose of this work is to automate the workflow for running compilations and measuring program performance. To achieve this goal, a web service was designed and implemented. The web service has a centralized distributed structure.Tasks for compiling and measuring program performance are run on remote workstations. The launch results are saved to the database and are available in the user interface.

The web service is designed and implemented on the basis of a client-server architecture . It consists of four separate parts: frontend (web client), backend (web server), databases, and agent. Each of these parts can be replaced with similar ones if necessary. Communication between the web service components is implemented using the HTTP  (HyperText Transfer Protocol) and WebSocket  protocols. The format of the transmitted data was JSON  (JavaScript Object Notation).
