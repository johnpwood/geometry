INSERT INTO login (learner, stamp) VALUES ((SELECT id FROM learner WHERE profile_id = $1), current_timestamp);
