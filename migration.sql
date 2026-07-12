-- MySQL Migration Script from Supabase
-- Generated for u749853029_pro

SET FOREIGN_KEY_CHECKS=0;

-- --------------------------------------------------------
-- Table structure for site_settings
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
  id VARCHAR(36) PRIMARY KEY,
  phone VARCHAR(255) NOT NULL DEFAULT '(888) 555-0199',
  phone_tel VARCHAR(255) NOT NULL DEFAULT '+18885550199',
  email VARCHAR(255) NOT NULL DEFAULT 'support@proleadsgeneration.com',
  address TEXT NOT NULL,
  admin_display_name VARCHAR(255) NOT NULL DEFAULT 'Admin',
  singleton BOOLEAN NOT NULL DEFAULT 1,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO site_settings (id, phone, phone_tel, email, address, admin_display_name, singleton, updated_at) VALUES
('605f01a9-a72b-4f5c-9b75-e14c19ec2ad9', '(888) 555-0199', '+18885550199', 'info@proleadsgeneration.com', '1200 Nationwide Blvd, Suite 500, Austin, TX 78701', 'Admin', 1, '2026-07-12 16:01:43');


-- --------------------------------------------------------
-- Table structure for services
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS services (
  id VARCHAR(36) PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  icon_name VARCHAR(255) NOT NULL DEFAULT 'Wrench',
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  tag VARCHAR(255) NOT NULL DEFAULT '',
  features JSON NOT NULL,
  price_from VARCHAR(255) NOT NULL DEFAULT '',
  response_time VARCHAR(255) NOT NULL DEFAULT '',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO services (id, slug, icon_name, title, description, tag, features, price_from, response_time, sort_order, created_at, updated_at) VALUES
('60aec9f7-8036-4ef8-901f-181b6a13a685', 'plumbing', 'Wrench', 'Plumbing Solutions', '24-hour plumbers for clogged drains, leak detection, sewer line repair, and water heater service — anywhere in the country.', 'Emergency Plumbing', '["Drain cleaning","Leak detection","Pipe repair","Water heater service","Sewer line repair","Fixture install"]', '$79', '45–75 min', 2, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('7528070c-5956-4c3d-a2ea-f22800fb9f21', 'pest-control', 'Bug', 'Pest Control', 'Top-rated exterminators for residential pest control, termite treatment, bed bugs, rodents and wasp nest removal.', 'Residential', '["Termite treatment","Bed bug removal","Rodent control","Wasp & hornet nests","Ant colony treatment","Quarterly plans"]', '$99', 'Same day', 3, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('b6cfd571-8d31-4b0a-9ae0-154bfb1b5055', 'roofing', 'Home', 'Premium Roofing', 'Emergency roof leak repair, storm damage inspection, shingle installation and transparent roof replacement quotes.', 'Storm Damage', '["Leak repair","Shingle install","Storm inspection","Gutter service","Full replacement","Insurance claims"]', '$149', '2–4 hours', 4, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('cfc774ed-05e0-44aa-b163-947fc8d3c547', 'garage-door', 'DoorOpen', 'Garage Door Repair', 'Broken spring repair, opener installation, cable replacement and overhead garage door service by trained specialists.', 'Same-Day', '["Spring replacement","Opener install","Cable & roller","Panel replacement","Remote programming","Safety inspection"]', '$89', 'Same day', 5, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('5b3ee2d9-c450-44dd-a510-10532397ec25', 'electrical', 'Zap', 'Electrical', 'Licensed electricians for panel upgrades, outlet installs, EV charger wiring and whole-home rewiring.', 'Licensed', '["Panel upgrades","Outlet & switch install","EV charger wiring","Whole-home rewiring","Lighting install","Code inspection"]', '$99', '1–2 hours', 6, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('33353fe2-3f9b-426c-af7d-92b6d46e1762', 'water-damage', 'Droplets', 'Water Damage Restoration', 'Emergency water extraction, structural drying, mold prevention and full restoration after floods or leaks.', 'Emergency', '["Water extraction","Structural drying","Mold prevention","Carpet restoration","Dehumidification","Insurance support"]', '$199', '30–60 min', 7, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('ee85500a-43c1-4a9f-8b24-8a53901f9f63', 'chimney', 'Flame', 'Chimney & Fireplace', 'Chimney sweeping, fireplace inspections, cap replacement and full masonry repair before winter arrives.', 'Seasonal', '["Chimney sweep","Cap replacement","Masonry repair","Liner install","Level 2 inspection","Gas fireplace service"]', '$129', 'Next day', 8, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('a140811b-91fb-4db0-8ee4-ff381763873e', 'appliance-repair', 'Snowflake', 'Appliance Repair', 'Refrigerators, washers, dryers, ovens and dishwashers — most brands serviced within 24 hours.', 'Home Appliances', '["Refrigerator","Washer & dryer","Oven & range","Dishwasher","Microwave","Ice maker"]', '$79', 'Same day', 9, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('21f59734-5702-4c17-aec2-a1a327d5a2cd', 'handyman', 'Hammer', 'Handyman & Remodel', 'Small fixes to full remodels — drywall, trim, doors, tile and everything on your punch list.', 'Trusted', '["Drywall repair","Trim & moulding","Door hanging","Tile install","Furniture assembly","TV mounting"]', '$65/hr', '1–2 days', 10, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('2dfdeb4d-2ee9-4c09-a661-5695d49dfaf7', 'locksmith', 'ShieldCheck', 'Locksmith & Security', 'Lockouts, rekeys, deadbolts, smart locks and home security installs — 24/7 emergency dispatch.', '24/7', '["Emergency lockout","Rekey service","Smart lock install","Deadbolt upgrade","Camera setup","Safe service"]', '$59', '20–40 min', 11, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('c4ab2ba6-01a6-444e-9607-7f367bba085e', 'painting', 'PaintBucket', 'Interior & Exterior Painting', 'Prep, prime and premium finishes for interiors, exteriors, cabinets and decks with a 5-year warranty.', 'Premium Finish', '["Interior painting","Exterior painting","Cabinet refinishing","Deck staining","Color consult","5-yr warranty"]', '$299', '2–3 days', 12, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('0b09ddd7-d3d5-4132-aebf-a7468aaa5598', 'hvac', 'Wind', 'HVAC Services', 'Fast emergency AC repair, furnace maintenance, air conditioning service and heat pump replacement by certified local technicians.', 'Heating & Cooling', '["AC repair & install","Furnace tune-up","Heat pump service","Duct cleaning","Thermostat setup","Annual maintenance"]', '$80', '60–90 min', 1, '2026-07-12 15:03:51', '2026-07-12 15:42:46');


-- --------------------------------------------------------
-- Table structure for reviews
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(255) NOT NULL DEFAULT '',
  service VARCHAR(255) NOT NULL DEFAULT '',
  rating INT NOT NULL DEFAULT 5,
  review_date VARCHAR(255) NOT NULL DEFAULT '',
  body TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO reviews (id, name, city, service, rating, review_date, body, sort_order, created_at, updated_at) VALUES
('d5c33597-ad1e-4ecd-80c7-b04596beb209', 'Mark T.', 'Round Rock, TX', 'HVAC', 5, 'May 2026', 'Our AC quit during a scorching afternoon. ProLeadsGeneration had a tech at our door in 90 minutes. Fixed the capacitor and charged exactly what was quoted. Absolute lifesavers.', 1, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('c8ccab8f-d9fd-47f4-ba37-5379e5c855fe', 'Sarah J.', 'Austin, TX', 'Plumbing', 5, 'April 2026', 'Woke up to a major pipe leak in the basement. Called dispatch and the plumber arrived with everything he needed. Full pipe overhaul done and the mess was gone.', 2, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('44480fc7-6135-4267-8500-615cdcad73dd', 'David K.', 'Georgetown, TX', 'Roofing', 5, 'March 2026', 'Highly recommend their roofing team. Severe storm damage, transparent field diagnostics, and the repair was handled without hassle. Very professional.', 3, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('a42a6168-a391-4697-af84-007ebe4962f7', 'Emily R.', 'Phoenix, AZ', 'Pest Control', 5, 'June 2026', 'Termite scare turned into a smooth treatment plan. The team explained every step and gave us a solid warranty on the treatment.', 4, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('7c7bb48e-573b-4799-9d97-25a2bc704dd3', 'Jonathan P.', 'Denver, CO', 'Electrical', 5, 'February 2026', 'Panel upgrade + EV charger install done in a single day. Clean work, permits pulled, fully inspected. Priced fairly.', 5, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('b67fe042-8806-4727-9cfc-624ae0bee19a', 'Priya S.', 'Charlotte, NC', 'Garage Door', 4, 'January 2026', 'Broken torsion spring replaced same-day. The tech was punctual and even tuned up the opener as part of the visit.', 6, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('6205ab6c-114b-49ed-b45e-c1872e0ccbe2', 'Michael B.', 'Chicago, IL', 'Water Damage', 5, 'May 2026', 'Basement flood at 2am — crew was on-site within an hour with extractors and dehumidifiers. Saved us from major mold issues.', 7, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('a7691154-4366-434b-bee6-4f78ad7b9536', 'Linda O.', 'Orlando, FL', 'Roofing', 5, 'June 2026', 'After the storm we needed a total roof inspection. They handled the insurance paperwork and delivered a beautiful new roof.', 8, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('c337f34f-dde2-4a74-a694-29ea25245ced', 'Chris H.', 'Seattle, WA', 'Appliance Repair', 5, 'March 2026', 'Fridge stopped cooling on a Sunday. Same-day appointment, part replaced, and it''s been running perfectly since.', 9, '2026-07-12 15:03:51', '2026-07-12 15:03:51');


-- --------------------------------------------------------
-- Table structure for faqs
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS faqs (
  id VARCHAR(36) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO faqs (id, question, answer, sort_order, created_at, updated_at) VALUES
('e7970f19-c52c-4135-abef-1e4a29241ecc', 'Are your home service technicians certified and insured?', 'Yes. Every pro in the ProLeadsGeneration network is licensed, insured, background-checked and continuously trained — from HVAC and plumbing to roofing and electrical.', 1, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('2d96620f-fad3-40db-a6d7-6f6e1f846963', 'Do you provide 24/7 emergency response?', 'We dispatch 24/7 emergency crews nationwide for HVAC breakdowns, leaks, storm-damaged roofs and urgent garage door failures.', 2, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('ec698fad-508a-41e6-a182-66040e223da4', 'What geographic areas do you cover?', 'All 50 U.S. states with dense coverage in California, Texas, Florida, New York, Georgia, Arizona and the Carolinas.', 3, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('f444a929-4428-4407-b9c8-68bb0c43ab33', 'How much does a diagnostic visit cost?', 'Every visit begins with a flat-rate diagnostic quote you approve before work starts. No hidden fees, ever.', 4, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('ad88ae99-1152-419d-b208-530eacf9a402', 'How fast can I book an emergency repair?', 'Most emergency jobs are booked same-day. Our dispatch routes your call to the closest available specialist in minutes.', 5, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('7f724669-31da-4266-b578-2c98a33c16c2', 'Do you offer warranties on completed work?', 'Yes. Repairs carry a minimum 90-day workmanship warranty and installs include a manufacturer warranty plus our 1–5 year labor guarantee depending on the trade.', 6, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('8318b2b1-82ce-4ad4-85da-4ab1102c0337', 'Do you accept insurance claims for roof and water damage?', 'We work directly with most major insurance carriers. Our estimators document damage, itemize scope and coordinate the claim on your behalf.', 7, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('f168130c-c93f-4768-90f0-c6c04394bbf7', 'What payment methods do you accept?', 'All major credit cards, ACH, Apple Pay and Google Pay. We also offer 0% APR financing for approved projects over $500.', 8, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('9f8c70ec-319e-4ca6-9caa-79e89b8c1dff', 'Can I schedule recurring maintenance?', 'Absolutely — HVAC tune-ups, pest control, chimney sweeps and roof inspections can all be scheduled on quarterly, semi-annual or annual plans.', 9, '2026-07-12 15:03:51', '2026-07-12 15:03:51'),
('9d80c310-f16f-4024-a43d-b678f8b89bbe', 'Is your work guaranteed if I''m not satisfied?', 'Yes. Every project is backed by our 100% satisfaction promise — if you''re not happy, we return and make it right at no additional charge.', 10, '2026-07-12 15:03:51', '2026-07-12 15:03:51');


-- --------------------------------------------------------
-- Table structure for coverage_states
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS coverage_states (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO coverage_states (id, name, sort_order, created_at) VALUES
('aaf59d3a-42e4-4a37-bc09-d2eabcd599e0', 'Alabama', 1, '2026-07-12 15:03:51'),
('dc04e059-e08a-4e80-a927-919906c6a8b0', 'Alaska', 2, '2026-07-12 15:03:51'),
('329f4f14-8260-49e6-9e98-c6279797ebe9', 'Arizona', 3, '2026-07-12 15:03:51'),
('fc4f3836-f217-4eb7-8e5c-f119a07e8b53', 'Arkansas', 4, '2026-07-12 15:03:51'),
('0cf32518-6a84-4285-a694-688e8e254483', 'California', 5, '2026-07-12 15:03:51'),
('3c9fb0d4-789a-4736-8455-4e7a006b4bb0', 'Colorado', 6, '2026-07-12 15:03:51'),
('c5a061a7-4970-4b25-9f71-5da18b086692', 'Connecticut', 7, '2026-07-12 15:03:51'),
('1777ac75-0bc1-4e18-b808-975d9a48a845', 'Delaware', 8, '2026-07-12 15:03:51'),
('e0bb0354-ef33-4017-a124-06dff66ecc2e', 'Florida', 9, '2026-07-12 15:03:51'),
('39276ebc-7098-4bd8-af50-5ba702df6e5b', 'Georgia', 10, '2026-07-12 15:03:51'),
('b42830a5-c086-4a2b-bfd1-22878f3b381f', 'Hawaii', 11, '2026-07-12 15:03:51'),
('6480744c-850a-43e3-b979-8bc8864038f3', 'Idaho', 12, '2026-07-12 15:03:51'),
('617cb881-4708-4afa-a581-b36f21536709', 'Illinois', 13, '2026-07-12 15:03:51'),
('9615c0b0-69bb-457e-8188-90da69393223', 'Indiana', 14, '2026-07-12 15:03:51'),
('b4c653f4-c277-4c49-89a4-8abce74a7274', 'Iowa', 15, '2026-07-12 15:03:51'),
('4175ecc6-9037-41f7-92ef-585fec2a5df2', 'Kansas', 16, '2026-07-12 15:03:51'),
('789cd8aa-d055-4863-94ae-3f41afb8a537', 'Kentucky', 17, '2026-07-12 15:03:51'),
('06e4e15b-315b-4324-ac9d-29e2e889bfe5', 'Louisiana', 18, '2026-07-12 15:03:51'),
('e99652b5-1344-4226-b12e-d23e2e054756', 'Maine', 19, '2026-07-12 15:03:51'),
('87b7254b-f691-4486-94b9-b17f45db2723', 'Maryland', 20, '2026-07-12 15:03:51'),
('f1f92f69-c6ab-45c6-bb57-6259150e973b', 'Massachusetts', 21, '2026-07-12 15:03:51'),
('8f9a4b22-8f80-4d2f-afde-1a20144f6281', 'Michigan', 22, '2026-07-12 15:03:51'),
('8ba537e7-757a-4bc5-a574-b4f540bf2e48', 'Minnesota', 23, '2026-07-12 15:03:51'),
('079f003a-2089-4ac6-99c8-a16998e6e59e', 'Mississippi', 24, '2026-07-12 15:03:51'),
('645fb114-e874-4981-bf82-94752e5aecf6', 'Missouri', 25, '2026-07-12 15:03:51'),
('441093d8-1a4d-478a-82db-97d4d4383f0f', 'Montana', 26, '2026-07-12 15:03:51'),
('9f2f3098-b851-4a3f-a15b-b297605dcd19', 'Nebraska', 27, '2026-07-12 15:03:51'),
('6f381e79-0170-4fb4-921b-c334138c7ef2', 'Nevada', 28, '2026-07-12 15:03:51'),
('be4d2e5f-7a0d-4704-9c8b-1cc038f0cf0e', 'New Hampshire', 29, '2026-07-12 15:03:51'),
('40fb3097-c58d-4e51-8d1c-922e82502d62', 'New Jersey', 30, '2026-07-12 15:03:51'),
('7314537b-3de8-4cee-807f-f2db958c03ad', 'New Mexico', 31, '2026-07-12 15:03:51'),
('bde97cba-cecc-43b4-b11c-a1bdc0a650bc', 'New York', 32, '2026-07-12 15:03:51'),
('86863349-c787-441c-9e45-b0e1c6b9ad7d', 'North Carolina', 33, '2026-07-12 15:03:51'),
('fe6440d1-f462-4c41-8e3a-581d77b535a3', 'North Dakota', 34, '2026-07-12 15:03:51'),
('936077a4-7302-4659-a523-493cdc582b94', 'Ohio', 35, '2026-07-12 15:03:51'),
('4a4c3b64-bba4-4afb-81a2-0786ddedfc34', 'Oklahoma', 36, '2026-07-12 15:03:51'),
('bc2c6817-cfbd-48d0-a844-e0cfcbffae67', 'Oregon', 37, '2026-07-12 15:03:51'),
('63638760-5722-41fa-862b-3c5c1a086101', 'Pennsylvania', 38, '2026-07-12 15:03:51'),
('64e14a51-6614-4484-a726-f55b77500e00', 'Rhode Island', 39, '2026-07-12 15:03:51'),
('1121bd91-830a-4b30-a2db-5fc1ad5e4517', 'South Carolina', 40, '2026-07-12 15:03:51'),
('5a8c01b5-9025-4dba-bdaa-0d4c3a94bc0f', 'South Dakota', 41, '2026-07-12 15:03:51'),
('e76ab2b2-717b-447e-8e61-d17472ac0438', 'Tennessee', 42, '2026-07-12 15:03:51'),
('a34e9ade-394d-477e-bf98-4ca7aa374c00', 'Texas', 43, '2026-07-12 15:03:51'),
('75992266-f18f-4b34-b2c9-a7ce41ec5684', 'Utah', 44, '2026-07-12 15:03:51'),
('db89c60b-4277-405c-a189-fa142c2cede7', 'Vermont', 45, '2026-07-12 15:03:51'),
('ceae3b8a-873a-4c63-84fc-4da622bb77a7', 'Virginia', 46, '2026-07-12 15:03:51'),
('d04901f8-6627-476c-af5b-d1fb59d16c01', 'Washington', 47, '2026-07-12 15:03:51'),
('e3dccba1-131f-48f4-82c7-4c478a29e464', 'West Virginia', 48, '2026-07-12 15:03:51'),
('7610a4ea-ae26-4f6b-8f5e-92ef6ce24a2c', 'Wisconsin', 49, '2026-07-12 15:03:51'),
('7f0637cf-7d64-43ee-a917-fa3278e3f749', 'Wyoming', 50, '2026-07-12 15:03:51');


-- --------------------------------------------------------
-- Table structure for coverage_cities
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS coverage_cities (
  id VARCHAR(36) PRIMARY KEY,
  state_id VARCHAR(36) NOT NULL,
  name VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO coverage_cities (id, state_id, name, sort_order, created_at) VALUES
('69b60454-095a-421b-b394-32e54c204c6a', '0cf32518-6a84-4285-a694-688e8e254483', 'Los Angeles', 1, '2026-07-12 15:03:51'),
('f96513a0-b052-4209-929a-e396d256c2ac', '0cf32518-6a84-4285-a694-688e8e254483', 'San Diego', 2, '2026-07-12 15:03:51'),
('7834002c-d118-4f30-a9d2-04bde6e847eb', '0cf32518-6a84-4285-a694-688e8e254483', 'San Francisco', 3, '2026-07-12 15:03:51'),
('1ce91e1d-8f75-4b21-ab09-a96ddcb0cf62', '0cf32518-6a84-4285-a694-688e8e254483', 'San Jose', 4, '2026-07-12 15:03:51'),
('4ee8f350-36d4-43a6-a2e5-6b8f6772d1e1', '0cf32518-6a84-4285-a694-688e8e254483', 'Sacramento', 5, '2026-07-12 15:03:51'),
('7bd2b881-c916-409d-9a4e-3ac2b1b512ee', 'a34e9ade-394d-477e-bf98-4ca7aa374c00', 'Houston', 1, '2026-07-12 15:03:51'),
('b463aae8-d3af-4794-b8de-6037c708a505', 'a34e9ade-394d-477e-bf98-4ca7aa374c00', 'Dallas', 2, '2026-07-12 15:03:51'),
('d84174c3-ef06-4c90-a9ea-688d3ff3ae21', 'a34e9ade-394d-477e-bf98-4ca7aa374c00', 'Austin', 3, '2026-07-12 15:03:51'),
('d5d9483e-61dc-44dd-a4b7-8147ae329154', 'a34e9ade-394d-477e-bf98-4ca7aa374c00', 'San Antonio', 4, '2026-07-12 15:03:51'),
('403f683c-d8ef-4f68-a883-e2cb2219a9b3', 'a34e9ade-394d-477e-bf98-4ca7aa374c00', 'Fort Worth', 5, '2026-07-12 15:03:51'),
('2e1ef575-4252-483e-a3e9-4dc3c05f3b57', 'e0bb0354-ef33-4017-a124-06dff66ecc2e', 'Miami', 1, '2026-07-12 15:03:51'),
('79a9c0cf-3624-4025-8918-4d5be71f5ad9', 'e0bb0354-ef33-4017-a124-06dff66ecc2e', 'Orlando', 2, '2026-07-12 15:03:51'),
('10f43dec-ee19-4ce4-8d8d-6c8399816965', 'e0bb0354-ef33-4017-a124-06dff66ecc2e', 'Tampa', 3, '2026-07-12 15:03:51'),
('804a4ad4-02bd-40fb-a67f-ea31172a5703', 'e0bb0354-ef33-4017-a124-06dff66ecc2e', 'Jacksonville', 4, '2026-07-12 15:03:51'),
('48ded8e0-69d3-435d-88ab-d56315c8b30c', 'e0bb0354-ef33-4017-a124-06dff66ecc2e', 'Fort Lauderdale', 5, '2026-07-12 15:03:51'),
('d97fc103-8e65-4ba5-b719-4261422bf4f1', 'bde97cba-cecc-43b4-b11c-a1bdc0a650bc', 'New York City', 1, '2026-07-12 15:03:51'),
('46df11f9-e1cd-47d3-8a82-b9b1cbb6bcb2', 'bde97cba-cecc-43b4-b11c-a1bdc0a650bc', 'Buffalo', 2, '2026-07-12 15:03:51'),
('4189c62e-ce74-4ead-8575-9fbc742dd3d7', 'bde97cba-cecc-43b4-b11c-a1bdc0a650bc', 'Rochester', 3, '2026-07-12 15:03:51'),
('eb0206f4-a21d-4f06-8a44-5c5ffea975f6', 'bde97cba-cecc-43b4-b11c-a1bdc0a650bc', 'Albany', 4, '2026-07-12 15:03:51'),
('0f3b3e3c-f4ef-448d-b5f9-dc664fffe038', 'bde97cba-cecc-43b4-b11c-a1bdc0a650bc', 'Syracuse', 5, '2026-07-12 15:03:51'),
('85dc32bf-4573-40db-8097-ed55c435de40', '39276ebc-7098-4bd8-af50-5ba702df6e5b', 'Atlanta', 1, '2026-07-12 15:03:51'),
('8fe8557b-928c-417d-bab6-8aa80d728f74', '39276ebc-7098-4bd8-af50-5ba702df6e5b', 'Savannah', 2, '2026-07-12 15:03:51'),
('c26dc040-06c5-4bc3-b288-811e79d30317', '39276ebc-7098-4bd8-af50-5ba702df6e5b', 'Augusta', 3, '2026-07-12 15:03:51'),
('22986396-732e-49c3-ab49-bd2859446fa3', '39276ebc-7098-4bd8-af50-5ba702df6e5b', 'Athens', 4, '2026-07-12 15:03:51'),
('b5feadf9-15df-4440-89cb-b3aed16456ff', '39276ebc-7098-4bd8-af50-5ba702df6e5b', 'Macon', 5, '2026-07-12 15:03:51'),
('22824ede-6da4-44bb-bcab-f08c2d4c1b28', '329f4f14-8260-49e6-9e98-c6279797ebe9', 'Phoenix', 1, '2026-07-12 15:03:51'),
('456b119e-b077-4000-8903-4104e510dc45', '329f4f14-8260-49e6-9e98-c6279797ebe9', 'Tucson', 2, '2026-07-12 15:03:51'),
('42fdd806-d4d6-4290-9d13-1b25fb9427b7', '329f4f14-8260-49e6-9e98-c6279797ebe9', 'Mesa', 3, '2026-07-12 15:03:51'),
('bcf081e5-b640-4974-b510-707ee2efe180', '329f4f14-8260-49e6-9e98-c6279797ebe9', 'Scottsdale', 4, '2026-07-12 15:03:51'),
('ad4c17a3-e195-4b0e-8793-64fd1f9b0e6b', '329f4f14-8260-49e6-9e98-c6279797ebe9', 'Chandler', 5, '2026-07-12 15:03:51'),
('2cd5d4b0-aad7-4b28-9037-60ebbaa672b4', '86863349-c787-441c-9e45-b0e1c6b9ad7d', 'Charlotte', 1, '2026-07-12 15:03:51'),
('6ee7bfa2-6b1f-424e-b697-3b1e11146739', '86863349-c787-441c-9e45-b0e1c6b9ad7d', 'Raleigh', 2, '2026-07-12 15:03:51'),
('b7abe50c-3eb6-48b8-8936-a2c51a44decf', '86863349-c787-441c-9e45-b0e1c6b9ad7d', 'Greensboro', 3, '2026-07-12 15:03:51'),
('67d0eb9f-983f-42d4-b6df-c2f2633c2de7', '86863349-c787-441c-9e45-b0e1c6b9ad7d', 'Durham', 4, '2026-07-12 15:03:51'),
('ccf8422c-41f6-43db-92e8-f6545e724bdb', '86863349-c787-441c-9e45-b0e1c6b9ad7d', 'Winston-Salem', 5, '2026-07-12 15:03:51'),
('14443036-a589-4eec-8097-bf28875207b2', '617cb881-4708-4afa-a581-b36f21536709', 'Chicago', 1, '2026-07-12 15:03:51'),
('d99fa0fa-9636-4699-9d16-7f9c625f5a3e', '617cb881-4708-4afa-a581-b36f21536709', 'Aurora', 2, '2026-07-12 15:03:51'),
('36e92fcf-4906-46a8-a8b9-3d5ae239f0c8', '617cb881-4708-4afa-a581-b36f21536709', 'Naperville', 3, '2026-07-12 15:03:51'),
('d316b825-66bd-4c08-b4fb-036a8bdf8542', '617cb881-4708-4afa-a581-b36f21536709', 'Rockford', 4, '2026-07-12 15:03:51'),
('c4f2e709-4a62-48a6-bacf-b03fa5805dcb', '617cb881-4708-4afa-a581-b36f21536709', 'Springfield', 5, '2026-07-12 15:03:51'),
('f1132922-b019-4d91-8cc3-3b4c82dc57ad', '936077a4-7302-4659-a523-493cdc582b94', 'Columbus', 1, '2026-07-12 15:03:51'),
('b5f81bb8-b993-46af-837b-b186b2791f6a', '936077a4-7302-4659-a523-493cdc582b94', 'Cleveland', 2, '2026-07-12 15:03:51'),
('0707696d-19dc-492d-a9dd-3669537f5231', '936077a4-7302-4659-a523-493cdc582b94', 'Cincinnati', 3, '2026-07-12 15:03:51'),
('5eed3f28-90e9-4461-af59-225a16be885f', '936077a4-7302-4659-a523-493cdc582b94', 'Toledo', 4, '2026-07-12 15:03:51'),
('c37bf517-ed3a-4798-b230-b271f4ff13c5', '936077a4-7302-4659-a523-493cdc582b94', 'Akron', 5, '2026-07-12 15:03:51'),
('90729f65-2182-46f0-b166-63b93b37d2c1', '63638760-5722-41fa-862b-3c5c1a086101', 'Philadelphia', 1, '2026-07-12 15:03:51'),
('0f75b103-67df-41ce-9276-76e151d3cdfc', '63638760-5722-41fa-862b-3c5c1a086101', 'Pittsburgh', 2, '2026-07-12 15:03:51'),
('e5dacf91-773e-4638-96e7-9a5885085ced', '63638760-5722-41fa-862b-3c5c1a086101', 'Allentown', 3, '2026-07-12 15:03:51'),
('23b396c4-c4b9-4f48-ac20-91fe6fd94bf8', '63638760-5722-41fa-862b-3c5c1a086101', 'Erie', 4, '2026-07-12 15:03:51'),
('fe5bba6a-dc81-42a8-8e8e-f89d7b80262d', '63638760-5722-41fa-862b-3c5c1a086101', 'Reading', 5, '2026-07-12 15:03:51'),
('3c43a796-4490-4be6-bb02-ece8f2bb5bfe', 'd04901f8-6627-476c-af5b-d1fb59d16c01', 'Seattle', 1, '2026-07-12 15:03:51'),
('93c068e7-c55d-43bf-8f82-58da9edd7ba1', 'd04901f8-6627-476c-af5b-d1fb59d16c01', 'Spokane', 2, '2026-07-12 15:03:51'),
('12b054cc-54ef-4c03-b08c-ed0259d3766f', 'd04901f8-6627-476c-af5b-d1fb59d16c01', 'Tacoma', 3, '2026-07-12 15:03:51'),
('a48076e1-b20d-4e03-9ca5-ab7e200591f7', 'd04901f8-6627-476c-af5b-d1fb59d16c01', 'Vancouver', 4, '2026-07-12 15:03:51'),
('aa45916d-42da-4377-9889-fbb3a4eade63', 'd04901f8-6627-476c-af5b-d1fb59d16c01', 'Bellevue', 5, '2026-07-12 15:03:51'),
('c585c7c4-c4e2-44a7-8405-5c3d135bf4f1', '3c9fb0d4-789a-4736-8455-4e7a006b4bb0', 'Denver', 1, '2026-07-12 15:03:51'),
('a0cdd88d-667c-4c14-9738-39dc15c31f0e', '3c9fb0d4-789a-4736-8455-4e7a006b4bb0', 'Colorado Springs', 2, '2026-07-12 15:03:51'),
('70c15e71-d86d-4061-a2d4-a85bee2045cc', '3c9fb0d4-789a-4736-8455-4e7a006b4bb0', 'Aurora', 3, '2026-07-12 15:03:51'),
('1911bcbd-0806-4951-81ac-00cae2c5260b', '3c9fb0d4-789a-4736-8455-4e7a006b4bb0', 'Fort Collins', 4, '2026-07-12 15:03:51'),
('327500b9-92d1-4757-8433-3a9f87b5f43a', '3c9fb0d4-789a-4736-8455-4e7a006b4bb0', 'Boulder', 5, '2026-07-12 15:03:51');


-- --------------------------------------------------------
-- Table structure for contact_submissions
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS contact_submissions (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(255) NOT NULL DEFAULT '',
  service VARCHAR(255) NOT NULL DEFAULT '',
  city VARCHAR(255) NOT NULL DEFAULT '',
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO contact_submissions (id, name, email, phone, service, city, message, is_read, created_at) VALUES
('2c158266-2254-4c95-bb22-b403964fc20b', 'Furhan Javed', 'farhanjaved357@gmail.com', '03407992357', 'Plumbing Solutions', 'Layyah', 'Urgency: Emergency (24/7)
test', 0, '2026-07-12 16:02:14');


-- --------------------------------------------------------
-- Table structure for users
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT IGNORE INTO users (id, email, password_hash, created_at, updated_at) VALUES ('8c6b208f-489f-4833-8834-1aaf39eb8d37', 'muhammadhusnain393393@gmail.com', 'dummy_hash', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


-- --------------------------------------------------------
-- Table structure for user_roles
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS user_roles (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT IGNORE INTO user_roles (id, user_id, role, created_at) VALUES
('622a5a3b-7e04-4831-9a37-ba2654ed4652', '8c6b208f-489f-4833-8834-1aaf39eb8d37', 'admin', '2026-07-12 15:33:14'),
('e8b39761-5c37-4e58-82fe-9fb246fc536d', '8c6b208f-489f-4833-8834-1aaf39eb8d37', 'super_admin', '2026-07-12 15:38:45');

SET FOREIGN_KEY_CHECKS=1;
