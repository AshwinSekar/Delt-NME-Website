# Delt-NME-Website
This website serves as a webapp that allows pledges to track progress while interviewing brothers as part
of the New Member Education process. It also displays vital information for the NME process such as the schedule 
and exam info.  
Features:  
-  Scoreboard to compare progress, and allow NME committe to oversee the proccess.  
-  Pledges have to answer basic info and personal questions about a brother in order to get credit for the Interview. This prevents cheating.  
-  Easily adaptable from sememster to semester. Just load in a new set of pledges, update brother Q's and launch.  

Ember.js/Bootstrap front-end, Node.js/Express back-end

# Todo:
## Front-end:
- [ ] Fix brotherspending problem
- [ ] Add loginNeeded page
- [ ] Add alert on failed login
- [ ] Fix scoreboard style

## Back-end:
- [ ] Add JSON web token authorization check for REST api
- [ ] Hash passwords
- [ ] Hash question answer with salt/secret key
- [ ] Upgrade to MongoDB

## Testing:
- [ ] Deploy to a domain
- [ ] Concurrency tests
- [ ] Penetration testing
