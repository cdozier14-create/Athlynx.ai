CREATE TABLE `verification_codes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`code` varchar(10) NOT NULL,
	`type` enum('signup','login','password_reset') NOT NULL DEFAULT 'signup',
	`verified` boolean NOT NULL DEFAULT false,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `verification_codes_id` PRIMARY KEY(`id`)
);
