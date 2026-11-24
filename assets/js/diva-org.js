/*
  diva-org.js : roster for the Diva Records Inc. org chart (org-chart.html)

  One row per seat. ManagerID links each person to who they report to.
  Status: "Active", "Open Req" (hiring) or "Vacant".

  Photos: add an image you have the rights to use at assets/img/divas/<EmployeeID>.jpg
  and set photo: true on that row. Without a photo, the chart shows a colored initials badge.
*/
window.DIVA_ORG = [
  // ---------- Executive ----------
  { EmployeeID: "D001", Name: "Beyoncé", Title: "Chief Executive Officer", ManagerID: "", Division: "Executive", Team: "", Status: "Active", photo: true },


  // ---------- Legal ----------
  { EmployeeID: "D020", Name: "Cher", Title: "General Counsel", ManagerID: "D001", Division: "Legal and Clearances", Team: "Legal and Clearances", Status: "Active", photo: true },

  // ---------- Press ----------
  { EmployeeID: "D030", Name: "Stefani Germanotta", Title: "VP, Press and Publicity", ManagerID: "D001", Division: "Press and Publicity", Team: "Press and Publicity", Status: "Active", photo: true  },
  { EmployeeID: "D031", Name: "Katy Perry", Title: "Social Media Manager", ManagerID: "D030", Division: "Press and Publicity", Team: "Press and Publicity", Status: "Active", photo: true  },
  { EmployeeID: "D032", Name: "Charli Aitchison", Title: "Brand Partnerships Lead", ManagerID: "D030", Division: "Press and Publicity", Team: "Press and Publicity", Status: "Active", photo: true  },
  { EmployeeID: "D033", Name: "", Title: "Publicist", ManagerID: "D030", Division: "Press and Publicity", Team: "Press and Publicity", Status: "Open Req" },

  // ---------- Royalties and Finance ----------
  { EmployeeID: "D040", Name: "Mariah Carey", Title: "Chief Financial Officer", ManagerID: "D001", Division: "Royalties and Finance", Team: "Royalties and Finance", Status: "Active", photo: true  },
  { EmployeeID: "D041", Name: "Taylor Swift", Title: "Masters and Catalog Manager", ManagerID: "D040", Division: "Royalties and Finance", Team: "Royalties and Finance", Status: "Active", photo: true  },
  { EmployeeID: "D042", Name: "Celine Dion", Title: "Controller", ManagerID: "D040", Division: "Royalties and Finance", Team: "Royalties and Finance", Status: "Active", photo: true  },
  { EmployeeID: "D043", Name: "Kelly Clarkson", Title: "Payroll Specialist", ManagerID: "D040", Division: "Royalties and Finance", Team: "Royalties and Finance", Status: "Active", photo: true  },
  { EmployeeID: "D044", Name: "", Title: "Royalties Analyst", ManagerID: "D040", Division: "Royalties and Finance", Team: "Royalties and Finance", Status: "Open Req", photo: true  },

  // ---------- Data and Insights ----------
  { EmployeeID: "D050", Name: "Ariana Grande", Title: "Director, Data and Insights", ManagerID: "D001", Division: "Data and Insights", Team: "Data and Insights", Status: "Active", photo: true  },
  { EmployeeID: "D051", Name: "Sabrina Carpenter", Title: "Data Analyst", ManagerID: "D050", Division: "Data and Insights", Team: "Data and Insights", Status: "Active", photo: true  },
  { EmployeeID: "D052", Name: "Olivia Rodrigo", Title: "BI Developer", ManagerID: "D050", Division: "Data and Insights", Team: "Data and Insights", Status: "Active", photo: true  },
  { EmployeeID: "D053", Name: "Billie Eilish", Title: "Data Engineer", ManagerID: "D050", Division: "Data and Insights", Team: "Data and Insights", Status: "Active", photo: true  },
  { EmployeeID: "D054", Name: "", Title: "Streaming Analyst", ManagerID: "D050", Division: "Data and Insights", Team: "Data and Insights", Status: "Open Req", photo: true  },



  // ---------- Touring and Live (largest division) ----------
  { EmployeeID: "D080", Name: "Madonna", Title: "President, Touring and Live", ManagerID: "D001", Division: "Touring and Live", Team: "", Status: "Active", photo: true  },

  { EmployeeID: "D081", Name: "Britney Spears", Title: "Head of Choreography", ManagerID: "D080", Division: "Touring and Live", Team: "Choreography", Status: "Active", photo: true },
  { EmployeeID: "D082", Name: "Normani Hamilton", Title: "Dance Captain", ManagerID: "D081", Division: "Touring and Live", Team: "Choreography", Status: "Active", photo: true },
  { EmployeeID: "D083", Name: "Tinashe Kachingwe", Title: "Dance Captain", ManagerID: "D081", Division: "Touring and Live", Team: "Choreography", Status: "Active", photo: true },
  { EmployeeID: "D084", Name: "Ciara Harris", Title: "Movement Director", ManagerID: "D081", Division: "Touring and Live", Team: "Choreography", Status: "Active", photo: true },

  { EmployeeID: "D085", Name: "Shakira Ripoll", Title: "Director, Stage Production", ManagerID: "D080", Division: "Touring and Live", Team: "Stage Production", Status: "Active", photo: true },
  { EmployeeID: "D086", Name: "Jennifer Lopez", Title: "Production Manager", ManagerID: "D085", Division: "Touring and Live", Team: "Stage Production", Status: "Active", photo: true },
  { EmployeeID: "D087", Name: "Karla (Camila) Cabello", Title: "Set Design Lead", ManagerID: "D085", Division: "Touring and Live", Team: "Stage Production", Status: "Active", photo: true },
  { EmployeeID: "D088", Name: "", Title: "Lighting Designer", ManagerID: "D085", Division: "Touring and Live", Team: "Stage Production", Status: "Open Req", photo: true },

  { EmployeeID: "D089", Name: "Mary J. Blige", Title: "Vocal Coaching Lead", ManagerID: "D080", Division: "Touring and Live", Team: "Vocal Coaching", Status: "Active", photo: true },
  { EmployeeID: "D090", Name: "Alicia Keys", Title: "Arrangements and Keys", ManagerID: "D089", Division: "Touring and Live", Team: "Vocal Coaching", Status: "Active", photo: true },

  { EmployeeID: "D093", Name: "Miley Cyrus", Title: "Fan Experience Lead", ManagerID: "D080", Division: "Touring and Live", Team: "Fan Experience", Status: "Active", photo: true },
  { EmployeeID: "D092", Name: "Chappell Roan", Title: "VIP Experience Manager", ManagerID: "D093", Division: "Touring and Live", Team: "Fan Experience", Status: "Active", photo: true },
  { EmployeeID: "D094", Name: "Kesha", Title: "Afterparty Coordinator", ManagerID: "D092", Division: "Touring and Live", Team: "Fan Experience", Status: "Active", photo: true },
  { EmployeeID: "D095", Name: "Lizzo", Title: "Community Manager", ManagerID: "D092", Division: "Touring and Live", Team: "Fan Experience", Status: "Active", photo: true },
  { EmployeeID: "D096", Name: "Cardi B", Title: "Fan Engagement Specialist", ManagerID: "D092", Division: "Touring and Live", Team: "Fan Experience", Status: "Active", photo: true },

  // ---------- Artist Development (A&R) ----------
  { EmployeeID: "D100", Name: "Rihanna", Title: "Head of A&R", ManagerID: "D001", Division: "Artist Development", Team: "", Status: "Active", photo: true },

  { EmployeeID: "D101", Name: "Dua Lipa", Title: "A&R Manager, Pop", ManagerID: "D100", Division: "Artist Development", Team: "Pop", Status: "Active", photo: true },
  { EmployeeID: "D102", Name: "Tate McRae", Title: "A&R Coordinator", ManagerID: "D101", Division: "Artist Development", Team: "Pop", Status: "Active", photo: true },
  { EmployeeID: "D103", Name: "Ava Max", Title: "A&R Coordinator", ManagerID: "D101", Division: "Artist Development", Team: "Pop", Status: "Active", photo: true },
  { EmployeeID: "D104", Name: "Raye", Title: "Songwriter Relations", ManagerID: "D101", Division: "Artist Development", Team: "Pop", Status: "Active", photo: true },

  { EmployeeID: "D105", Name: "Nicki Minaj", Title: "A&R Manager, Hip-Hop and R&B", ManagerID: "D100", Division: "Artist Development", Team: "Hip-Hop and R&B", Status: "Active", photo: true },
  { EmployeeID: "D106", Name: "Doja Cat", Title: "A&R Coordinator", ManagerID: "D105", Division: "Artist Development", Team: "Hip-Hop and R&B", Status: "Active", photo: true },
  { EmployeeID: "D107", Name: "Megan Pete", Title: "Talent Scout", ManagerID: "D105", Division: "Artist Development", Team: "Hip-Hop and R&B", Status: "Active", photo: true },
  { EmployeeID: "D108", Name: "Solána Rowe", Title: "Songwriter Relations", ManagerID: "D105", Division: "Artist Development", Team: "Hip-Hop and R&B", Status: "Active", photo: true },

  { EmployeeID: "D109", Name: "Ella Yelich-O'Connor", Title: "A&R Manager, Alternative", ManagerID: "D100", Division: "Artist Development", Team: "Alternative", Status: "Active", photo: true },
  { EmployeeID: "D110", Name: "Elizabeth (Lana) Grant", Title: "Creative Director", ManagerID: "D109", Division: "Artist Development", Team: "Alternative", Status: "Active", photo: true },
  { EmployeeID: "D111", Name: "Ashley (Halsey) Frangipane", Title: "A&R Coordinator", ManagerID: "D109", Division: "Artist Development", Team: "Alternative", Status: "Active", photo: true },
  { EmployeeID: "D112", Name: "Sia Furler", Title: "Topline Writer", ManagerID: "D109", Division: "Artist Development", Team: "Alternative", Status: "Active", photo: true },

  // ---------- Merch and Brand Ventures ----------
  { EmployeeID: "D120", Name: "Selena Gomez", Title: "VP, Merch and Beauty", ManagerID: "D001", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Active", photo: true },
  { EmployeeID: "D121", Name: "Demi Lovato", Title: "Merch Buyer", ManagerID: "D120", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Active", photo: true },
  { EmployeeID: "D122", Name: "Kim Petras", Title: "Product Designer", ManagerID: "D120", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Active", photo: true },
  { EmployeeID: "D123", Name: "Alecia (Pink) Moore", Title: "Store Operations Manager", ManagerID: "D120", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Active", photo: true },
  { EmployeeID: "D124", Name: "Nelly Furtado", Title: "Licensing Manager", ManagerID: "D120", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Active", photo: true },
  { EmployeeID: "D125", Name: "Stacy (Fergie) Ferguson", Title: "E-commerce Lead", ManagerID: "D120", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Active", photo: true },
  { EmployeeID: "D126", Name: "", Title: "Pop-up Shop Lead", ManagerID: "D120", Division: "Merch and Brand Ventures", Team: "Merch and Brand Ventures", Status: "Open Req", photo: true }
];
