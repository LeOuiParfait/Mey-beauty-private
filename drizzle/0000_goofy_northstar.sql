CREATE TABLE `private_event_leads` (
	`id` text PRIMARY KEY NOT NULL,
	`created_at` integer NOT NULL,
	`occasion` text NOT NULL,
	`event_date` text NOT NULL,
	`participants` integer NOT NULL,
	`experience` text NOT NULL,
	`treatments_json` text NOT NULL,
	`options_json` text NOT NULL,
	`first_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`message` text DEFAULT '' NOT NULL,
	`consent` integer NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`utm_source` text DEFAULT '' NOT NULL,
	`utm_medium` text DEFAULT '' NOT NULL,
	`utm_campaign` text DEFAULT '' NOT NULL,
	`utm_content` text DEFAULT '' NOT NULL,
	`referrer` text DEFAULT '' NOT NULL,
	`landing_url` text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE INDEX `private_event_leads_created_at_idx` ON `private_event_leads` (`created_at`);--> statement-breakpoint
CREATE INDEX `private_event_leads_status_idx` ON `private_event_leads` (`status`);--> statement-breakpoint
CREATE INDEX `private_event_leads_email_idx` ON `private_event_leads` (`email`);