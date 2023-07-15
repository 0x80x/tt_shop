import os


def get_logging_config(debug: bool) -> dict:
    template = {
        'version': 1,
        'disable_existing_loggers': False,
        'formatters': {
            'any': {
                'format': '%(asctime)s %(levelname)-8s %(name)-15s %(message)s'
            }
        },
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'formatter': 'any'
            },
        },
        'loggers': {
            '': {
                'level': 'DEBUG' if debug else 'INFO',
                'handlers': ['console'],
                'propagate': False
            }
        }
    }
    if debug:
        template.get('handlers').get('console').update({'class': 'rich.logging.RichHandler'})
        for log in template.get('loggers').values():
            log.update({'handlers': ['console',]})            
    return template
