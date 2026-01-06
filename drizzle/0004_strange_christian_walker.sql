CREATE TABLE `coach_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`schoolName` varchar(128) NOT NULL,
	`conference` varchar(64),
	`division` varchar(16),
	`sport` varchar(32) NOT NULL,
	`title` varchar(128),
	`positionCoached` varchar(32),
	`email` varchar(320),
	`phone` varchar(20),
	`isVerified` boolean NOT NULL DEFAULT false,
	`verifiedAt` timestamp,
	`subscriptionTier` enum('free','basic','pro','enterprise') DEFAULT 'free',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coach_profiles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `coach_watchlists` (
	`id` int AUTO_INCREMENT NOT NULL,
	`coachProfileId` int NOT NULL,
	`transferPortalEntryId` int NOT NULL,
	`notes` text,
	`priority` enum('low','medium','high','top') DEFAULT 'medium',
	`status` enum('watching','contacted','visited','offered','committed','passed') DEFAULT 'watching',
	`addedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `coach_watchlists_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portal_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fromUserId` int NOT NULL,
	`toUserId` int NOT NULL,
	`transferPortalEntryId` int,
	`subject` varchar(256),
	`message` text NOT NULL,
	`isRead` boolean NOT NULL DEFAULT false,
	`readAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `portal_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `saved_searches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`coachProfileId` int NOT NULL,
	`name` varchar(128) NOT NULL,
	`filtersJson` text NOT NULL,
	`alertsEnabled` boolean DEFAULT false,
	`lastRunAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `saved_searches_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transfer_offers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`transferPortalEntryId` int NOT NULL,
	`coachProfileId` int NOT NULL,
	`schoolName` varchar(128) NOT NULL,
	`scholarshipType` enum('full','partial','walk-on','preferred-walk-on'),
	`nilOffered` int,
	`status` enum('pending','accepted','declined','expired','withdrawn') DEFAULT 'pending',
	`offerDetails` text,
	`playerNotes` text,
	`offeredAt` timestamp NOT NULL DEFAULT (now()),
	`respondedAt` timestamp,
	`expiresAt` timestamp,
	CONSTRAINT `transfer_offers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `transfer_portal_entries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`athleteProfileId` int,
	`userId` int,
	`fullName` varchar(128) NOT NULL,
	`sport` varchar(32) NOT NULL,
	`position` varchar(16) NOT NULL,
	`secondaryPosition` varchar(16),
	`height` varchar(10),
	`weight` int,
	`graduationYear` int,
	`eligibilityRemaining` int,
	`gpa` decimal(3,2),
	`major` varchar(128),
	`currentSchool` varchar(128) NOT NULL,
	`currentConference` varchar(64),
	`currentDivision` varchar(16),
	`status` enum('available','entered','committed','withdrawn','signed') NOT NULL DEFAULT 'entered',
	`newSchool` varchar(128),
	`newConference` varchar(64),
	`playerRating` decimal(4,4),
	`nilValuation` int,
	`starRating` int,
	`statsJson` text,
	`highlightVideoUrl` text,
	`hudlProfileUrl` text,
	`email` varchar(320),
	`phone` varchar(20),
	`instagramHandle` varchar(64),
	`twitterHandle` varchar(64),
	`tiktokHandle` varchar(64),
	`totalFollowers` int,
	`engagementRate` decimal(4,2),
	`hasAgent` boolean DEFAULT false,
	`agentName` varchar(128),
	`agentContact` varchar(320),
	`preferredRegions` text,
	`preferredDivisions` text,
	`openToAllOffers` boolean DEFAULT true,
	`enteredPortalAt` timestamp DEFAULT (now()),
	`committedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`isPublic` boolean NOT NULL DEFAULT true,
	`isVerified` boolean NOT NULL DEFAULT false,
	CONSTRAINT `transfer_portal_entries_id` PRIMARY KEY(`id`)
);
