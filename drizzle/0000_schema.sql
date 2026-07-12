CREATE TABLE `contact_submissions` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(255) NOT NULL DEFAULT '',
	`service` varchar(255) NOT NULL DEFAULT '',
	`city` varchar(255) NOT NULL DEFAULT '',
	`message` text NOT NULL,
	`is_read` boolean NOT NULL DEFAULT false,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_submissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coverage_cities` (
	`id` varchar(36) NOT NULL,
	`state_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `coverage_cities_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coverage_states` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `coverage_states_id` PRIMARY KEY(`id`),
	CONSTRAINT `coverage_states_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` varchar(36) NOT NULL,
	`question` text NOT NULL,
	`answer` text NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`city` varchar(255) NOT NULL DEFAULT '',
	`service` varchar(255) NOT NULL DEFAULT '',
	`rating` int NOT NULL DEFAULT 5,
	`review_date` varchar(255) NOT NULL DEFAULT '',
	`body` text NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` varchar(36) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`icon_name` varchar(255) NOT NULL DEFAULT 'Wrench',
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`tag` varchar(255) NOT NULL DEFAULT '',
	`features` json NOT NULL DEFAULT ('[]'),
	`price_from` varchar(255) NOT NULL DEFAULT '',
	`response_time` varchar(255) NOT NULL DEFAULT '',
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` varchar(36) NOT NULL,
	`phone` varchar(255) NOT NULL DEFAULT '(888) 555-0199',
	`phone_tel` varchar(255) NOT NULL DEFAULT '+18885550199',
	`email` varchar(255) NOT NULL DEFAULT 'support@proleadsgeneration.com',
	`address` text NOT NULL,
	`admin_display_name` varchar(255) NOT NULL DEFAULT 'Admin',
	`singleton` boolean NOT NULL DEFAULT true,
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user_roles` (
	`id` varchar(36) NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`role` varchar(20) NOT NULL DEFAULT 'admin',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `user_roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` varchar(36) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
