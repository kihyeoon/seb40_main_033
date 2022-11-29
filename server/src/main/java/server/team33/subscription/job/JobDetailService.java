package server.team33.subscription.job;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobKey;
import org.springframework.stereotype.Component;
import server.team33.order.entity.ItemOrder;

import static org.quartz.JobBuilder.newJob;

@Slf4j
@Component
@RequiredArgsConstructor
public class JobDetailService {
    public JobDetail buildJobDetail( JobKey jobKey, Long orderId, ItemOrder itemOrder ){

        log.warn("오더아이디 = {}", orderId);
        log.warn("아이템오더아이디 = {}", itemOrder.getItemOrderId());

        JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put("orderId", orderId);
        jobDataMap.put("itemOrder", itemOrder);

        return newJob(SubscriptionJob.class).withIdentity(jobKey).usingJobData(jobDataMap).build();
    }
}
