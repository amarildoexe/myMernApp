import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

import dotenv from "dotenv";

dotenv.config();

// create a ratelimiter that ALLOWS 10 request per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(20, "5 s")
});

export default ratelimit;